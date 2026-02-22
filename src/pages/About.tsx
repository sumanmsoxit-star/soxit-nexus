import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Target, Users, Award, Globe, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";

const values = [
  { icon: Target, title: "Precision", desc: "Every solution is engineered with measurable outcomes and clear KPIs." },
  { icon: Users, title: "Trust", desc: "We build long-term partnerships based on transparency and integrity." },
  { icon: Award, title: "Excellence", desc: "Industry-standard frameworks and world-class talent drive everything we do." },
  { icon: Globe, title: "Innovation", desc: "AI-first thinking applied to solve the most complex enterprise challenges." },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const AboutPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>About SOXIT | Building Trust. Delivering Quality.</title>
        <meta name="description" content="Learn about SOXIT Consulting Services — our mission, values, and vision to become India's leading AI-integrated consulting enterprise by 2030." />
      </Helmet>

      <section className="bg-primary pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-consulting-accent mb-4 block">About</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight max-w-3xl">
              Building Trust. Delivering Quality.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl leading-relaxed">
              SOXIT Consulting Services is an AI-integrated enterprise operating across consulting, education, and media — united by a single mission: measurable impact.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-enterprise section-light">
        <SectionHeader label="Our Mission" title="Intelligence at Every Layer" description="We embed AI into enterprise operations, talent development, and creative production to deliver outcomes that matter." />
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeInUp} className="text-muted-foreground leading-relaxed text-lg">
            Founded with a vision to bridge the gap between technology potential and enterprise reality, SOXIT operates as an integrated ecosystem — the CAO model (Consulting, Academia, Open Media). Each division reinforces the others, creating a self-sustaining value chain that delivers compounding returns for our clients, our learners, and our creative partners.
          </motion.p>
        </div>
      </section>

      <section className="section-enterprise section-sunken">
        <SectionHeader label="Our Values" title="What Drives Us" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <motion.div key={v.title} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }} className="metric-card flex gap-5">
              <div className="p-3 rounded-lg bg-consulting-accent/10 h-fit">
                <v.icon size={24} className="text-consulting-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-enterprise section-dark">
        <SectionHeader label="Leadership" title="Advisory Board" description="Our leadership brings decades of enterprise experience across technology, consulting, and media." light />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["CEO & Founder", "CTO", "Chief Strategy Officer"].map((role, i) => (
            <motion.div key={role} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }}>
              <div className="p-6 rounded-xl border border-surface-dark-foreground/10 text-center">
                <div className="w-20 h-20 rounded-full bg-surface-dark-foreground/10 mx-auto mb-4" />
                <h3 className="font-bold text-surface-dark-foreground">Coming Soon</h3>
                <p className="text-sm text-surface-dark-foreground/60 mt-1">{role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-consulting-accent">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-consulting-accent-foreground mb-4">Join Our Journey</h2>
          <p className="text-consulting-accent-foreground/70 mb-8">Be part of India's next great technology enterprise.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/careers" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              View Careers <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-consulting-accent-foreground/30 text-consulting-accent-foreground font-semibold text-sm hover:bg-consulting-accent-foreground/10 transition-colors">
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default AboutPage;
