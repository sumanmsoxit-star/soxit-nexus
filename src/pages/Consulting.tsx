import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Shield, Cloud, Brain, Lock, Workflow, Server } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import VideoHero from "@/components/shared/VideoHero";
import consultingVideo from "@/assets/videos/consulting-hero.mp4";
import heroBg from "@/assets/hero-bg.jpg";

const frameworks = ["ITIL", "NIST", "ISO 27001", "TOGAF", "DevSecOps", "Zero Trust"];

const services = [
  { icon: Server, title: "Enterprise Application Engineering", desc: "Custom enterprise solutions built on microservices, event-driven architecture, and AI-augmented development pipelines." },
  { icon: Cloud, title: "Cloud & Infrastructure", desc: "Multi-cloud strategy, migration, and management across AWS, Azure, and GCP with infrastructure-as-code." },
  { icon: Brain, title: "AI & Data Science", desc: "Machine learning models, NLP solutions, computer vision, and predictive analytics for enterprise decision-making." },
  { icon: Lock, title: "Cybersecurity & MSSP", desc: "Managed security services, SOC operations, threat intelligence, and compliance-driven security architecture." },
  { icon: Workflow, title: "Digital Transformation", desc: "End-to-end digital transformation strategy, process automation, and organizational change management." },
  { icon: Shield, title: "ERP & CRM", desc: "Implementation, customization, and AI enhancement of SAP, Oracle, Salesforce, and Microsoft Dynamics platforms." },
];

const lifecycle = [
  { step: "01", title: "Diagnose", desc: "AI-powered assessment of current enterprise landscape, technology debt, and optimization opportunities." },
  { step: "02", title: "Architect", desc: "Design scalable, compliant architecture leveraging industry-standard frameworks and AI-first principles." },
  { step: "03", title: "Automate", desc: "Implement intelligent automation across workflows, testing, deployment, and monitoring." },
  { step: "04", title: "Secure", desc: "Deploy zero-trust security, continuous compliance monitoring, and threat intelligence systems." },
  { step: "05", title: "Optimize", desc: "Continuous AI-driven optimization of performance, cost, and operational efficiency." },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const ConsultingPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Consulting Services | SOXIT - Enterprise Technology Advisory</title>
        <meta name="description" content="SOXIT Consulting delivers AI-augmented enterprise technology advisory across cloud, cybersecurity, digital transformation, and ERP solutions." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "SOXIT Consulting Services",
          "description": "AI-driven consulting, digital transformation, and enterprise-grade IT solutions.",
          "url": "https://soxit.in/consulting"
        })}</script>
      </Helmet>

      <VideoHero
        videoSrc={consultingVideo}
        fallbackImage={heroBg}
        label="Consulting"
        headline="Solving Industry Challenges with Intelligent Technology"
        subtext="AI-driven consulting, digital transformation, and enterprise-grade IT solutions."
        ctaText="Explore Consulting Solutions"
        ctaLink="#services"
        accentClass="text-consulting-accent"
        ctaClass="btn-consulting"
      />

      {/* Frameworks */}
      <section className="section-enterprise section-light">
        <SectionHeader label="Our Foundation" title="Industry-Standard Frameworks" description="SOXIT integrates AI into the world's most trusted enterprise frameworks." />
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {frameworks.map((f, i) => (
            <motion.div key={f} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.08 }}>
              <div className="px-6 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:border-consulting-accent hover:text-consulting-accent transition-colors cursor-default">
                {f}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Service Pillars */}
      <section id="services" className="section-enterprise section-sunken">
        <SectionHeader label="Service Pillars" title="What We Deliver" description="Six core service pillars, each enhanced with AI capabilities." />
        <div className="grid-enterprise max-w-7xl mx-auto">
          {services.map((s, i) => (
            <motion.div key={s.title} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }} className="metric-card">
              <div className="p-3 rounded-lg bg-consulting-accent/10 w-fit mb-4">
                <s.icon size={24} className="text-consulting-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lifecycle */}
      <section className="section-enterprise section-dark">
        <SectionHeader label="Our Approach" title="AI-Augmented Enterprise Lifecycle" light />
        <div className="max-w-3xl mx-auto space-y-6">
          {lifecycle.map((l, i) => (
            <motion.div key={l.step} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }}>
              <div className="flex gap-6 p-6 rounded-xl border border-surface-dark-foreground/10 hover:border-consulting-accent/30 transition-colors">
                <div className="text-3xl font-bold text-consulting-accent/40">{l.step}</div>
                <div>
                  <h3 className="text-lg font-bold text-surface-dark-foreground mb-1">{l.title}</h3>
                  <p className="text-sm text-surface-dark-foreground/60 leading-relaxed">{l.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 gradient-consulting">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transform Your Enterprise</h2>
          <p className="text-white/70 mb-8">Schedule a strategic consultation with our AI-integrated advisory team.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
            Schedule Consultation <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
};

export default ConsultingPage;
