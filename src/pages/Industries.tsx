import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Building2, Heart, Factory, GraduationCap, Tv, Landmark } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";

const industries = [
  { icon: Building2, name: "BFSI", full: "Banking, Financial Services & Insurance", desc: "AI-driven risk assessment, fraud detection, compliance automation, and digital banking transformation. We help financial institutions modernize legacy systems while maintaining regulatory compliance.", services: ["AI Risk Modeling", "Regulatory Compliance Automation", "Digital Banking Platforms", "Fraud Detection Systems"] },
  { icon: Heart, name: "Healthcare", full: "Digital Health & Life Sciences", desc: "Intelligent health systems, predictive diagnostics, telemedicine platforms, and clinical data analytics. Enabling healthcare providers to deliver better patient outcomes through AI.", services: ["Predictive Diagnostics", "Telemedicine Solutions", "Clinical Data Analytics", "Health Information Systems"] },
  { icon: Factory, name: "Manufacturing", full: "Smart Manufacturing & IoT", desc: "Industry 4.0 transformation with IoT integration, predictive maintenance, supply chain optimization, and AI-driven quality control systems.", services: ["IoT Integration", "Predictive Maintenance", "Supply Chain AI", "Quality Control Automation"] },
  { icon: GraduationCap, name: "EdTech", full: "Education Technology", desc: "AI-personalized learning platforms, competency mapping, virtual labs, and intelligent assessment systems for educational institutions and corporate training.", services: ["AI Personalized Learning", "Virtual Lab Infrastructure", "Competency Assessment", "Learning Analytics"] },
  { icon: Tv, name: "Media & Digital Brands", full: "Media & Digital", desc: "AI content production, audience analytics, campaign intelligence, and digital asset management for media companies and digital-first brands.", services: ["AI Content Production", "Audience Intelligence", "Campaign Optimization", "Digital Asset Management"] },
  { icon: Landmark, name: "Government & Public Sector", full: "Government", desc: "Digital governance solutions, cybersecurity frameworks, citizen services platforms, and data-driven policy intelligence for public sector organizations.", services: ["Digital Governance", "Cybersecurity Frameworks", "Citizen Service Portals", "Policy Intelligence"] },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const IndustriesPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Industries | SOXIT - AI Solutions Across Sectors</title>
        <meta name="description" content="SOXIT delivers AI-integrated solutions across BFSI, Healthcare, Manufacturing, EdTech, Media, and Government sectors." />
      </Helmet>

      <section className="bg-primary pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-consulting-accent mb-4 block">Industries</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
              Driving Impact Across Sectors
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-2xl">
              Domain-specific AI solutions for the world's most critical industries.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-enterprise section-light">
        <div className="max-w-5xl mx-auto space-y-12">
          {industries.map((ind, i) => (
            <motion.div key={ind.name} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.08 }}>
              <div className="metric-card p-8 md:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-consulting-accent/10">
                    <ind.icon size={28} className="text-consulting-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{ind.name}</h2>
                    <p className="text-sm text-muted-foreground">{ind.full}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{ind.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {ind.services.map((s) => (
                    <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-medium">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default IndustriesPage;
