import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { candidateId } = await req.json();
    if (!candidateId) throw new Error("candidateId is required");

    // Fetch candidate
    const { data: candidate, error: candidateError } = await supabase
      .from("candidates")
      .select("*")
      .eq("id", candidateId)
      .single();
    if (candidateError || !candidate) throw new Error("Candidate not found");

    // Fetch job
    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("*")
      .eq("job_post_id", candidate.job_post_id)
      .single();
    if (jobError || !job) throw new Error("Job not found");

    // Build AI prompt
    const prompt = `You are an AI recruitment screening engine. Analyze the candidate profile against the job requirements and provide a structured assessment.

JOB DETAILS:
- Title: ${job.title}
- Department: ${job.department}
- Required Skills: ${(job.required_skills || []).join(", ")}
- Experience Range: ${job.experience_range || "Not specified"}
- Qualifications: ${job.qualifications || "Not specified"}

CANDIDATE PROFILE:
- Name: ${candidate.name}
- Experience: ${candidate.experience || "Not specified"}
- Relevant Experience: ${candidate.relevant_experience || "Not specified"}
- Primary Skills: ${(candidate.primary_skills || []).join(", ")}
- Secondary Skills: ${(candidate.secondary_skills || []).join(", ")}
- Certifications: ${(candidate.certifications || []).join(", ")}
- Domain Exposure: ${candidate.domain_exposure || "Not specified"}

SCORING FORMULA:
- Technical Skills Match: 40%
- Experience Relevance: 25%
- Domain Exposure: 15%
- Certifications: 10%
- Resume Quality: 10%

Return your assessment using the suggest_assessment tool.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a precise AI recruitment screening engine. Always use the tool to return structured output." },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_assessment",
              description: "Return the AI screening assessment for the candidate",
              parameters: {
                type: "object",
                properties: {
                  score: { type: "number", description: "Overall match score 0-100" },
                  skill_gap_summary: { type: "string", description: "Brief summary of skill gaps and strengths (max 200 chars)" },
                  recommended_stage: { type: "string", enum: ["screening", "technical", "hr", "final"], description: "Recommended interview stage" },
                  decision: { type: "string", enum: ["auto_reject", "manual_review", "auto_shortlist"], description: "Auto decision based on score" },
                },
                required: ["score", "skill_gap_summary", "recommended_stage", "decision"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "suggest_assessment" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("AI did not return structured output");

    const assessment = JSON.parse(toolCall.function.arguments);
    const score = Math.min(100, Math.max(0, Math.round(assessment.score)));

    // Determine application status based on score
    let newStatus = "ai_screened";
    if (score >= 75) newStatus = "shortlisted";
    else if (score < 40) newStatus = "rejected";

    // Update candidate
    const { error: updateError } = await supabase
      .from("candidates")
      .update({
        ai_score: score,
        skill_gap_summary: assessment.skill_gap_summary,
        recommended_interview_stage: assessment.recommended_stage,
        application_status: newStatus,
      })
      .eq("id", candidateId);

    if (updateError) throw updateError;

    // Audit log
    await supabase.from("audit_logs").insert({
      entity_type: "candidate",
      entity_id: candidateId,
      action: "ai_screening",
      details: { score, decision: assessment.decision, skill_gap: assessment.skill_gap_summary },
    });

    return new Response(
      JSON.stringify({ score, skill_gap_summary: assessment.skill_gap_summary, recommended_stage: assessment.recommended_stage, decision: assessment.decision, new_status: newStatus }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("AI screening error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
