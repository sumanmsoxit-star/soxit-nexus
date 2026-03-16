import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, MapPin, Briefcase, Calendar, DollarSign,
  Users, ChevronDown, Laptop, Building, Globe
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/integrations/supabase/types";

type Job = Tables<"jobs">;

const workModeIcon = (mode?: string) => {
  if (!mode) return null;
  const lower = mode.toLowerCase();
  if (lower.includes("remote")) return <Globe size={12} />;
  if (lower.includes("hybrid")) return <Laptop size={12} />;
  return <Building size={12} />;
};

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({ job, index }: JobCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <div className="metric-card">
        {/* Header row */}
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setExpanded(!expanded)}
          role="button"
          aria-expanded={expanded}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setExpanded(!expanded)}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="font-bold text-foreground">{job.title}</h3>
              <Badge variant="outline" className="text-[10px] border-consulting-accent/30 text-consulting-accent">
                {job.department}
              </Badge>
              <Badge
                variant={job.status === "open" ? "default" : "secondary"}
                className={job.status === "open" ? "bg-academia/10 text-academia border-academia/20 text-[10px]" : "bg-destructive/10 text-destructive border-destructive/20 text-[10px]"}
              >
                {job.status === "open" ? "Open" : "Closed"}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Briefcase size={11} />{job.employment_type}</span>
              <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
              <span className="flex items-center gap-1"><Calendar size={11} />{new Date(job.posting_date).toLocaleDateString()}</span>
              {job.experience_range && <span>{job.experience_range}</span>}
              {job.ctc_range && <span className="flex items-center gap-1"><DollarSign size={11} />{job.ctc_range}</span>}
              {(job.openings_fte ?? 0) > 0 && (
                <span className="flex items-center gap-1"><Users size={11} />FTE: {job.openings_fte}</span>
              )}
              {(job.openings_intern ?? 0) > 0 && (
                <span className="flex items-center gap-1"><Users size={11} />Intern: {job.openings_intern}</span>
              )}
            </div>
          </div>

          <ChevronDown
            size={18}
            className={`text-muted-foreground shrink-0 ml-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </div>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                {job.description && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Role Overview</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
                  </div>
                )}

                {job.required_skills && job.required_skills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {job.required_skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-[10px] border-border">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {job.qualifications && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Qualifications</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{job.qualifications}</p>
                  </div>
                )}

                {job.eligibility && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Eligibility</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{job.eligibility}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild size="sm" className="btn-consulting gap-1.5">
                    <Link to={`/careers/job/${job.job_post_id.toLowerCase()}`}>
                      View Details <ArrowRight size={14} />
                    </Link>
                  </Button>
                  {job.status === "open" && (
                    <Button asChild size="sm" className="gap-1.5 bg-consulting-accent text-white hover:bg-consulting-accent-hover">
                      <Link to={`/careers/apply/${job.job_post_id.toLowerCase()}`}>
                        Apply Now
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default JobCard;
