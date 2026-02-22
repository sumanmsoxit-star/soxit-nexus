import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, MapPin, Briefcase, Code, Shield, Brain, Cloud } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";

const openings = [
  { title: "Senior AI Engineer", division: "Consulting", location: "Hyderabad", type: "Full-time", icon: Brain },
  { title: "Cloud Solutions Architect", division: "Consulting", location: "Hyderabad", type: "Full-time", icon: Cloud },
  { title: "SOC Analyst", division: "Consulting", location: "Hyderabad", type: "Full-time", icon: Shield },
  { title: "Full Stack Developer", division: "Academia", location: "Hyderabad", type: "Full-time", icon: Code },
  { title: "Creative Director", division: "Open Media", location: "Hyderabad", type: "Full-time", icon: Briefcase },
  { title: "DevOps Engineer", division: "Consulting", location: "Remote", type: "Full-time", icon: Code },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const CareersPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Careers at SOXIT | Join Our Team</title>
        <meta name="description" content="Join SOXIT Consulting Services. Explore careers in AI engineering, cloud architecture, cybersecurity, and creative production." />
      </Helmet>

      <section className="bg-primary pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-consulting-accent mb-4 block">Careers</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight max-w-3xl">
              Shape the Future of Enterprise Technology
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl">
              Join a team that's redefining how AI integrates with consulting, education, and media.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-enterprise section-light">
        <SectionHeader label="Open Positions" title="Current Opportunities" description="We're looking for talented individuals who share our passion for innovation." />
        <div className="max-w-4xl mx-auto space-y-4">
          {openings.map((job, i) => (
            <motion.div key={job.title} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.08 }}>
              <Link to="/contact" className="metric-card group flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-consulting-accent/10">
                    <job.icon size={20} className="text-consulting-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-consulting-accent transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{job.division}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
                      <span>·</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-consulting-accent transition-colors shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default CareersPage;
