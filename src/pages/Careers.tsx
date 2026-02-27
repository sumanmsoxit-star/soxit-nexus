import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, MapPin, Briefcase, Search, Filter, Calendar, DollarSign } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Job = Tables<"jobs">;

const departments = ["All", "AI", "Cloud", "Cyber", "Data", "DevOps", "ERP", "Full Stack", "Media", "Consulting"];
const experienceLevels = ["All", "0-2 years", "3-7 years", "8+ years"];
const employmentTypes = ["All", "Full-time", "Internship", "Contract"];
const statusOptions = ["All", "open", "closed"];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const CareersPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [experience, setExperience] = useState("All");
  const [employmentType, setEmploymentType] = useState("All");
  const [status, setStatus] = useState("All");
  const [location, setLocation] = useState("All");
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("posting_date", { ascending: false });

    if (!error && data) {
      setJobs(data);
      const uniqueLocations = [...new Set(data.map((j) => j.location))];
      setLocations(uniqueLocations);
    }
    setLoading(false);
  };

  const filtered = jobs.filter((job) => {
    if (search && !job.title.toLowerCase().includes(search.toLowerCase()) && !job.department.toLowerCase().includes(search.toLowerCase())) return false;
    if (department !== "All" && !job.department.toLowerCase().includes(department.toLowerCase())) return false;
    if (employmentType !== "All" && job.employment_type !== employmentType) return false;
    if (status !== "All" && job.status !== status) return false;
    if (location !== "All" && job.location !== location) return false;
    if (experience !== "All" && job.experience_range) {
      // Simple filter logic
      if (experience === "0-2 years" && !job.experience_range.includes("0") && !job.experience_range.includes("1") && !job.experience_range.includes("2")) return false;
    }
    return true;
  });

  return (
    <Layout>
      <Helmet>
        <title>Careers at SOXIT | Join Our Team</title>
        <meta name="description" content="Join SOXIT Consulting Services. Explore careers in AI engineering, cloud architecture, cybersecurity, and creative production." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "hiringOrganization": { "@type": "Organization", "name": "SOXIT Consulting Services" },
        })}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-primary pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-consulting-accent mb-4 block">Careers</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight max-w-3xl">
              Shape the Future of Enterprise Technology
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl">
              Join a team that's redefining how AI integrates with consulting, education, and media. We're looking for talented individuals who share our passion for innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="section-enterprise section-sunken">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Filter size={20} className="text-consulting-accent" />
            <h2 className="text-lg font-semibold text-foreground">Filter Opportunities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search roles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>

            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
              <SelectContent>
                {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger><SelectValue placeholder="Experience" /></SelectTrigger>
              <SelectContent>
                {experienceLevels.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={employmentType} onValueChange={setEmploymentType}>
              <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                {employmentTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Location" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Locations</SelectItem>
                {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => <SelectItem key={s} value={s}>{s === "All" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section-enterprise section-light">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader label="Open Positions" title="Current Opportunities" description="" />
            <span className="text-sm text-muted-foreground">{filtered.length} position{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="metric-card animate-pulse h-24" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase size={48} className="mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-lg font-medium text-foreground">No positions match your filters</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((job, i) => (
                <motion.div key={job.id} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.06 }}>
                  <Link
                    to={`/careers/job/${job.job_post_id.toLowerCase()}`}
                    className="metric-card group flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground group-hover:text-consulting-accent transition-colors">{job.title}</h3>
                        <Badge variant={job.status === "open" ? "default" : "secondary"} className={job.status === "open" ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}>
                          {job.status === "open" ? "Open" : "Closed"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Briefcase size={12} />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} />{new Date(job.posting_date).toLocaleDateString()}</span>
                        {job.experience_range && <span>{job.experience_range}</span>}
                        {job.ctc_range && <span className="flex items-center gap-1"><DollarSign size={12} />{job.ctc_range}</span>}
                        <span>{job.employment_type}</span>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-muted-foreground group-hover:text-consulting-accent transition-colors shrink-0 ml-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CareersPage;
