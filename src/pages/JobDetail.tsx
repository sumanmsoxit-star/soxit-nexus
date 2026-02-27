import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, MapPin, Briefcase, Calendar, DollarSign, Clock, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Job = Tables<"jobs">;

const JobDetail = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .ilike("job_post_id", jobId!.toUpperCase())
      .single();
    setJob(data);
    setLoading(false);
  };

  if (loading) return (
    <Layout>
      <div className="pt-32 pb-20 px-6"><div className="max-w-4xl mx-auto animate-pulse"><div className="h-8 bg-muted rounded w-1/3 mb-4" /><div className="h-4 bg-muted rounded w-2/3 mb-8" /><div className="h-64 bg-muted rounded" /></div></div>
    </Layout>
  );

  if (!job) return (
    <Layout>
      <div className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">Job not found</h1>
        <Link to="/careers" className="text-consulting-accent hover:underline mt-4 inline-block">← Back to Careers</Link>
      </div>
    </Layout>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || "",
    datePosted: job.posting_date,
    validThrough: job.closing_date || undefined,
    employmentType: job.employment_type === "Full-time" ? "FULL_TIME" : job.employment_type === "Internship" ? "INTERN" : "OTHER",
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" } },
    hiringOrganization: { "@type": "Organization", name: "SOXIT Consulting Services", sameAs: "https://soxit.com" },
    baseSalary: job.ctc_range ? { "@type": "MonetaryAmount", currency: "INR", value: { "@type": "QuantitativeValue", value: job.ctc_range } } : undefined,
  };

  return (
    <Layout>
      <Helmet>
        <title>{job.title} | Careers at SOXIT</title>
        <meta name="description" content={`Apply for ${job.title} at SOXIT. ${job.department} department, ${job.location}. ${job.experience_range || ""}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="bg-primary pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground mb-6">
            <ArrowLeft size={16} /> Back to Careers
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono text-consulting-accent">{job.job_post_id}</span>
              <Badge variant={job.status === "open" ? "default" : "secondary"} className={job.status === "open" ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-red-500/20 text-red-300"}>
                {job.status === "open" ? "Open" : "Closed"}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground">{job.title}</h1>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1.5"><Briefcase size={14} />{job.department}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} />{job.location}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} />Posted {new Date(job.posting_date).toLocaleDateString()}</span>
              {job.experience_range && <span className="flex items-center gap-1.5"><Clock size={14} />{job.experience_range}</span>}
              {job.ctc_range && <span className="flex items-center gap-1.5"><DollarSign size={14} />{job.ctc_range}</span>}
              <span>{job.employment_type}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-enterprise section-light">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            {job.description && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">About the Role</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>
            )}

            {job.required_skills && job.required_skills.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.required_skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-consulting-accent/30 text-foreground">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}

            {job.qualifications && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Qualifications</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.qualifications}</p>
              </div>
            )}

            {job.eligibility && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Eligibility</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.eligibility}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="metric-card">
              <h3 className="font-bold text-foreground mb-4">Job Details</h3>
              <dl className="space-y-3 text-sm">
                <div><dt className="text-muted-foreground">Department</dt><dd className="font-medium text-foreground">{job.department}</dd></div>
                <div><dt className="text-muted-foreground">Location</dt><dd className="font-medium text-foreground">{job.location}</dd></div>
                <div><dt className="text-muted-foreground">Type</dt><dd className="font-medium text-foreground">{job.employment_type}</dd></div>
                {job.experience_range && <div><dt className="text-muted-foreground">Experience</dt><dd className="font-medium text-foreground">{job.experience_range}</dd></div>}
                {job.ctc_range && <div><dt className="text-muted-foreground">CTC Range</dt><dd className="font-medium text-foreground">{job.ctc_range}</dd></div>}
                {(job.openings_fte ?? 0) > 0 && <div><dt className="text-muted-foreground">FTE Openings</dt><dd className="font-medium text-foreground flex items-center gap-1"><Users size={14} />{job.openings_fte}</dd></div>}
                {(job.openings_intern ?? 0) > 0 && <div><dt className="text-muted-foreground">Intern Openings</dt><dd className="font-medium text-foreground flex items-center gap-1"><Users size={14} />{job.openings_intern}</dd></div>}
                {job.closing_date && <div><dt className="text-muted-foreground">Apply By</dt><dd className="font-medium text-foreground">{new Date(job.closing_date).toLocaleDateString()}</dd></div>}
              </dl>
            </div>

            {job.status === "open" ? (
              <Button asChild className="w-full btn-consulting" size="lg">
                <Link to={`/careers/apply/${job.job_post_id.toLowerCase()}`}>Apply Now</Link>
              </Button>
            ) : (
              <Button disabled className="w-full" size="lg">Applications Closed</Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JobDetail;
