import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Briefcase } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import CareersHero from "@/components/careers/CareersHero";
import CareersFilters from "@/components/careers/CareersFilters";
import JobCard from "@/components/careers/JobCard";
import WorkCulture from "@/components/careers/WorkCulture";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Job = Tables<"jobs">;

const CareersPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [experience, setExperience] = useState("All");
  const [employmentType, setEmploymentType] = useState("All");
  const [workMode, setWorkMode] = useState("All");
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
    if (department !== "All" && !job.department.toLowerCase().includes(department.toLowerCase().split(" ")[0])) return false;
    if (employmentType !== "All" && job.employment_type !== employmentType) return false;
    if (status !== "All" && job.status !== status) return false;
    if (location !== "All" && job.location !== location) return false;
    if (experience !== "All" && job.experience_range) {
      if (experience === "Intern" && job.employment_type !== "Internship") return false;
      if (experience.startsWith("FTE") && job.employment_type !== "Full-time") return false;
    }
    return true;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SOXIT Consulting Services",
    url: "https://soxit.com",
    description: "AI-driven consulting, digital transformation, and enterprise-grade IT solutions.",
    jobPostings: filtered.slice(0, 10).map((job) => ({
      "@type": "JobPosting",
      title: job.title,
      datePosted: job.posting_date,
      employmentType: job.employment_type === "Full-time" ? "FULL_TIME" : "INTERN",
      jobLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" },
      },
      hiringOrganization: { "@type": "Organization", name: "SOXIT Consulting Services" },
    })),
  };

  return (
    <Layout>
      <Helmet>
        <title>Careers at SOXIT | AI, Cloud & Cybersecurity Jobs</title>
        <meta name="description" content="Join SOXIT — hiring across AI, Data, Cybersecurity, Cloud, Engineering & Digital Transformation domains aligned to global capability center (GCC) demand." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <CareersHero />

      <CareersFilters
        search={search} onSearchChange={setSearch}
        department={department} onDepartmentChange={setDepartment}
        workMode={workMode} onWorkModeChange={setWorkMode}
        experience={experience} onExperienceChange={setExperience}
        employmentType={employmentType} onEmploymentTypeChange={setEmploymentType}
        location={location} onLocationChange={setLocation}
        locations={locations}
        status={status} onStatusChange={setStatus}
      />

      {/* Job Listings */}
      <section id="open-positions" className="section-enterprise section-light">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader label="Open Positions" title="Current Opportunities" description="" />
            <span className="text-sm text-muted-foreground">{filtered.length} position{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="metric-card animate-pulse h-20" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase size={48} className="mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-lg font-medium text-foreground">No positions match your filters</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <WorkCulture />
    </Layout>
  );
};

export default CareersPage;
