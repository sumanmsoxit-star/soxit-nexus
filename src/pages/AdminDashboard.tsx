import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Users, Briefcase, BarChart3, LogOut, Plus, Eye, Brain, ChevronDown, Download,
  Search, Filter, CheckCircle2, XCircle, Clock, TrendingUp, Loader2
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Job = Tables<"jobs">;
type Candidate = Tables<"candidates">;

const statusColors: Record<string, string> = {
  applied: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  ai_screened: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  shortlisted: "bg-green-500/10 text-green-600 border-green-500/20",
  interview_scheduled: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  technical_round: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  hr_round: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  offered: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  hired: "bg-green-600/10 text-green-700 border-green-600/20",
  rejected: "bg-red-500/10 text-red-500 border-red-500/20",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCandidates, setSearchCandidates] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterJob, setFilterJob] = useState("All");
  const [showNewJob, setShowNewJob] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", department: "", description: "", location: "Hyderabad", experience_range: "", ctc_range: "", employment_type: "Full-time", required_skills: "", qualifications: "", eligibility: "", openings_fte: "1", openings_intern: "0" });
  const [savingJob, setSavingJob] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [jobsRes, candidatesRes] = await Promise.all([
      supabase.from("jobs").select("*").order("posting_date", { ascending: false }),
      supabase.from("candidates").select("*").order("applied_date", { ascending: false }),
    ]);
    if (jobsRes.data) setJobs(jobsRes.data);
    if (candidatesRes.data) setCandidates(candidatesRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin/login"); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (!roles || roles.length === 0) { navigate("/admin/login"); return; }
      fetchData();
    };
    checkAuth();
  }, [navigate, fetchData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const createJob = async () => {
    setSavingJob(true);
    try {
      const { error } = await supabase.from("jobs").insert({
        job_post_id: "", // auto-generated
        title: newJob.title,
        department: newJob.department,
        description: newJob.description,
        location: newJob.location,
        experience_range: newJob.experience_range,
        ctc_range: newJob.ctc_range,
        employment_type: newJob.employment_type,
        required_skills: newJob.required_skills.split(",").map((s) => s.trim()).filter(Boolean),
        qualifications: newJob.qualifications,
        eligibility: newJob.eligibility,
        openings_fte: parseInt(newJob.openings_fte) || 0,
        openings_intern: parseInt(newJob.openings_intern) || 0,
        created_by: (await supabase.auth.getUser()).data.user?.id,
      });
      if (error) throw error;
      toast({ title: "Job Created" });
      setShowNewJob(false);
      setNewJob({ title: "", department: "", description: "", location: "Hyderabad", experience_range: "", ctc_range: "", employment_type: "Full-time", required_skills: "", qualifications: "", eligibility: "", openings_fte: "1", openings_intern: "0" });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSavingJob(false);
    }
  };

  const updateCandidateStatus = async (candidateId: string, newStatus: string) => {
    const { error } = await supabase.from("candidates").update({ application_status: newStatus as any }).eq("id", candidateId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      setCandidates((prev) => prev.map((c) => c.id === candidateId ? { ...c, application_status: newStatus as any } : c));
      toast({ title: "Status Updated" });
    }
  };

  const triggerAiScreening = async (candidateId: string) => {
    toast({ title: "AI Screening", description: "Analyzing resume..." });
    try {
      const { data, error } = await supabase.functions.invoke("ai-screen-resume", { body: { candidateId } });
      if (error) throw error;
      toast({ title: "AI Screening Complete", description: `Score: ${data?.score || "N/A"}/100` });
      fetchData();
    } catch (err: any) {
      toast({ title: "Screening Failed", description: err.message, variant: "destructive" });
    }
  };

  const toggleJobStatus = async (jobId: string, currentStatus: string) => {
    const newStatus = currentStatus === "open" ? "closed" : "open";
    const { error } = await supabase.from("jobs").update({ status: newStatus as any }).eq("id", jobId);
    if (!error) {
      setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, status: newStatus as any } : j));
      toast({ title: `Job ${newStatus === "open" ? "Reopened" : "Closed"}` });
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    if (searchCandidates && !c.name.toLowerCase().includes(searchCandidates.toLowerCase()) && !c.email.toLowerCase().includes(searchCandidates.toLowerCase())) return false;
    if (filterStatus !== "All" && c.application_status !== filterStatus) return false;
    if (filterJob !== "All" && c.job_post_id !== filterJob) return false;
    return true;
  });

  const stats = {
    totalJobs: jobs.length,
    openJobs: jobs.filter((j) => j.status === "open").length,
    totalCandidates: candidates.length,
    shortlisted: candidates.filter((c) => ["shortlisted", "interview_scheduled", "technical_round", "hr_round", "offered", "hired"].includes(c.application_status)).length,
    avgAiScore: candidates.filter((c) => c.ai_score).reduce((sum, c) => sum + (c.ai_score || 0), 0) / (candidates.filter((c) => c.ai_score).length || 1),
  };

  if (loading) return <Layout><div className="pt-40 pb-20 text-center"><Loader2 className="animate-spin mx-auto text-consulting-accent" size={32} /></div></Layout>;

  return (
    <Layout>
      <Helmet><title>Recruitment Dashboard | SOXIT Admin</title></Helmet>

      <section className="bg-primary pt-28 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary-foreground">Recruitment Dashboard</h1>
            <p className="text-sm text-primary-foreground/60">Manage jobs, candidates, and hiring pipeline</p>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-primary-foreground/70 hover:text-primary-foreground">
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface-sunken border-b border-border py-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Jobs", value: stats.totalJobs, icon: Briefcase },
            { label: "Open Positions", value: stats.openJobs, icon: CheckCircle2 },
            { label: "Total Candidates", value: stats.totalCandidates, icon: Users },
            { label: "Shortlisted", value: stats.shortlisted, icon: TrendingUp },
            { label: "Avg AI Score", value: Math.round(stats.avgAiScore), icon: Brain },
          ].map((stat) => (
            <div key={stat.label} className="metric-card flex items-center gap-3">
              <div className="p-2 rounded-lg bg-consulting-accent/10"><stat.icon size={18} className="text-consulting-accent" /></div>
              <div><p className="text-2xl font-bold text-foreground">{stat.value}</p><p className="text-xs text-muted-foreground">{stat.label}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-enterprise section-light">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="candidates">
            <TabsList className="mb-6">
              <TabsTrigger value="candidates"><Users size={14} className="mr-1" />Candidates</TabsTrigger>
              <TabsTrigger value="jobs"><Briefcase size={14} className="mr-1" />Jobs</TabsTrigger>
              <TabsTrigger value="analytics"><BarChart3 size={14} className="mr-1" />Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="candidates">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search candidates..." value={searchCandidates} onChange={(e) => setSearchCandidates(e.target.value)} className="pl-10" />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    {["applied", "ai_screened", "shortlisted", "interview_scheduled", "technical_round", "hr_round", "offered", "hired", "rejected"].map((s) => (
                      <SelectItem key={s} value={s}>{s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterJob} onValueChange={setFilterJob}>
                  <SelectTrigger className="w-[200px]"><SelectValue placeholder="Job" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Jobs</SelectItem>
                    {jobs.map((j) => <SelectItem key={j.job_post_id} value={j.job_post_id}>{j.title}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {filteredCandidates.length === 0 ? (
                  <p className="text-center py-12 text-muted-foreground">No candidates found</p>
                ) : filteredCandidates.map((candidate) => (
                  <motion.div key={candidate.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="metric-card">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-foreground">{candidate.name}</h3>
                          <Badge variant="outline" className={statusColors[candidate.application_status] || ""}>
                            {candidate.application_status.replace(/_/g, " ")}
                          </Badge>
                          {candidate.ai_score !== null && (
                            <Badge variant="outline" className={candidate.ai_score >= 75 ? "border-green-500/30 text-green-600" : candidate.ai_score >= 40 ? "border-yellow-500/30 text-yellow-600" : "border-red-500/30 text-red-500"}>
                              AI: {candidate.ai_score}/100
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{candidate.email} · {candidate.phone} · {candidate.job_post_id}</p>
                        <p className="text-xs text-muted-foreground mt-1">{candidate.candidate_profile_id} · Applied {new Date(candidate.applied_date).toLocaleDateString()}</p>
                        {candidate.primary_skills && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {candidate.primary_skills.slice(0, 5).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-[10px] border-border">{skill}</Badge>
                            ))}
                          </div>
                        )}
                        {candidate.skill_gap_summary && <p className="text-xs text-muted-foreground mt-2 italic">{candidate.skill_gap_summary}</p>}
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Select value={candidate.application_status} onValueChange={(v) => updateCandidateStatus(candidate.id, v)}>
                          <SelectTrigger className="w-[160px] h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {["applied", "ai_screened", "shortlisted", "interview_scheduled", "technical_round", "hr_round", "offered", "hired", "rejected"].map((s) => (
                              <SelectItem key={s} value={s}>{s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button size="sm" variant="outline" onClick={() => triggerAiScreening(candidate.id)} className="text-xs">
                          <Brain size={12} className="mr-1" /> AI Screen
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="jobs">
              <div className="flex justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">Job Postings</h2>
                <Dialog open={showNewJob} onOpenChange={setShowNewJob}>
                  <DialogTrigger asChild>
                    <Button className="btn-consulting"><Plus size={14} className="mr-1" /> Create Job</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader><DialogTitle>Create New Job Posting</DialogTitle></DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium mb-1 block">Job Title *</label><Input value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} placeholder="Senior AI Engineer" /></div>
                        <div><label className="text-sm font-medium mb-1 block">Department *</label><Input value={newJob.department} onChange={(e) => setNewJob({ ...newJob, department: e.target.value })} placeholder="AI" /></div>
                      </div>
                      <div><label className="text-sm font-medium mb-1 block">Description</label><Textarea value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} rows={4} /></div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium mb-1 block">Location</label><Input value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} /></div>
                        <div><label className="text-sm font-medium mb-1 block">Experience Range</label><Input value={newJob.experience_range} onChange={(e) => setNewJob({ ...newJob, experience_range: e.target.value })} placeholder="3-7 years" /></div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium mb-1 block">CTC Range</label><Input value={newJob.ctc_range} onChange={(e) => setNewJob({ ...newJob, ctc_range: e.target.value })} placeholder="12-25 LPA" /></div>
                        <div><label className="text-sm font-medium mb-1 block">Employment Type</label>
                          <Select value={newJob.employment_type} onValueChange={(v) => setNewJob({ ...newJob, employment_type: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full-time">Full-time</SelectItem>
                              <SelectItem value="Internship">Internship</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div><label className="text-sm font-medium mb-1 block">Required Skills (comma-separated)</label><Input value={newJob.required_skills} onChange={(e) => setNewJob({ ...newJob, required_skills: e.target.value })} placeholder="Python, TensorFlow, AWS..." /></div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium mb-1 block">FTE Openings</label><Input type="number" value={newJob.openings_fte} onChange={(e) => setNewJob({ ...newJob, openings_fte: e.target.value })} /></div>
                        <div><label className="text-sm font-medium mb-1 block">Intern Openings</label><Input type="number" value={newJob.openings_intern} onChange={(e) => setNewJob({ ...newJob, openings_intern: e.target.value })} /></div>
                      </div>
                      <div><label className="text-sm font-medium mb-1 block">Qualifications</label><Textarea value={newJob.qualifications} onChange={(e) => setNewJob({ ...newJob, qualifications: e.target.value })} rows={2} /></div>
                      <Button onClick={createJob} disabled={savingJob || !newJob.title || !newJob.department} className="w-full btn-consulting">
                        {savingJob ? <Loader2 size={16} className="animate-spin mr-2" /> : <Plus size={16} className="mr-2" />} Create Job Posting
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="metric-card flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-foreground">{job.title}</h3>
                        <Badge variant="outline" className={job.status === "open" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}>{job.status}</Badge>
                        <span className="text-xs font-mono text-muted-foreground">{job.job_post_id}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{job.department} · {job.location} · {job.employment_type} · {candidates.filter((c) => c.job_post_id === job.job_post_id).length} applicants</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => toggleJobStatus(job.id, job.status)} className="text-xs">
                        {job.status === "open" ? <XCircle size={12} className="mr-1" /> : <CheckCircle2 size={12} className="mr-1" />}
                        {job.status === "open" ? "Close" : "Reopen"}
                      </Button>
                      <Button size="sm" variant="ghost" asChild><Link to={`/careers/job/${job.job_post_id.toLowerCase()}`}><Eye size={12} /></Link></Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="metric-card">
                  <h3 className="font-bold text-foreground mb-4">Application Pipeline</h3>
                  {["applied", "ai_screened", "shortlisted", "interview_scheduled", "offered", "hired", "rejected"].map((status) => {
                    const count = candidates.filter((c) => c.application_status === status).length;
                    const pct = candidates.length ? Math.round((count / candidates.length) * 100) : 0;
                    return (
                      <div key={status} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <span className="text-xs text-muted-foreground capitalize">{status.replace(/_/g, " ")}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-consulting-accent rounded-full" style={{ width: `${pct}%` }} /></div>
                          <span className="text-xs font-mono text-foreground w-8 text-right">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="metric-card">
                  <h3 className="font-bold text-foreground mb-4">AI Score Distribution</h3>
                  {[{ label: "Auto-Shortlist (75+)", min: 75, max: 101 }, { label: "Manual Review (40-74)", min: 40, max: 75 }, { label: "Auto-Reject (<40)", min: 0, max: 40 }].map((range) => {
                    const count = candidates.filter((c) => c.ai_score !== null && c.ai_score >= range.min && c.ai_score < range.max).length;
                    return (
                      <div key={range.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <span className="text-xs text-muted-foreground">{range.label}</span>
                        <span className="text-sm font-bold text-foreground">{count}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="metric-card">
                  <h3 className="font-bold text-foreground mb-4">Top Departments</h3>
                  {[...new Set(jobs.map((j) => j.department))].map((dept) => {
                    const count = candidates.filter((c) => jobs.find((j) => j.job_post_id === c.job_post_id)?.department === dept).length;
                    return (
                      <div key={dept} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <span className="text-xs text-muted-foreground">{dept}</span>
                        <span className="text-sm font-bold text-foreground">{count} applicants</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
