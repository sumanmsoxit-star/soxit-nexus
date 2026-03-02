import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Brain, Layers, BarChart3, Building2, Heart, Factory, GraduationCap, Tv, Landmark, ChevronRight, Cpu, Target, Zap, Globe } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import heroBg from "@/assets/hero-bg.jpg";

const divisions = [
  {
    title: "Consulting",
    description: "Enterprise-grade technology advisory powered by AI. From cloud transformation to cybersecurity, we architect resilient digital futures.",
    metric: "70%",
    metricLabel: "Operational Optimization",
    link: "/consulting",
    cta: "Explore Consulting",
    panelClass: "division-panel-consulting",
    icon: Shield,
    accentClass: "text-consulting-accent",
  },
  {
    title: "Academia",
    description: "We don't teach courses. We engineer role-ready professionals through AI-driven competency mapping and real-time skill validation.",
    metric: "40%",
    metricLabel: "Learning Success Enhancement",
    link: "/academia",
    cta: "Discover Academia",
    panelClass: "division-panel-academia",
    icon: GraduationCap,
    accentClass: "text-academia",
  },
  {
    title: "Open Media",
    description: "Where creativity meets intelligence. AI-powered content production, brand strategy, and intelligent media infrastructure.",
    metric: "50%",
    metricLabel: "Faster Production Cycles",
    link: "/open-media",
    cta: "Experience Open Media",
    panelClass: "division-panel-media",
    icon: Tv,
    accentClass: "text-media-accent",
  },
];

const whySoxit = [
  { icon: Brain, title: "AI Embedded Across Divisions", desc: "Artificial intelligence is not an add-on — it's the foundation of every service we deliver." },
  { icon: Shield, title: "Compliance-First Architecture", desc: "Built on NIST, ISO 27001, and Zero Trust frameworks from day one." },
  { icon: Layers, title: "Ecosystem Model (CAO)", desc: "Consulting, Academia, and Open Media work as an integrated value chain." },
  { icon: BarChart3, title: "Measurable Impact Framework", desc: "Every engagement is quantified with clear KPIs and outcome tracking." },
];

const industries = [
  { icon: Building2, name: "BFSI", desc: "Banking, Financial Services & Insurance" },
  { icon: Heart, name: "Healthcare", desc: "Digital Health & Life Sciences" },
  { icon: Factory, name: "Manufacturing", desc: "Smart Manufacturing & IoT" },
  { icon: GraduationCap, name: "EdTech", desc: "Education Technology" },
  { icon: Tv, name: "Media & Digital", desc: "Media & Digital Brands" },
  { icon: Landmark, name: "Government", desc: "Government & Public Sector" },
];

const outlook = [
  { icon: Globe, title: "AI-Driven Consulting Expansion", desc: "Scaling intelligent advisory services across APAC and beyond." },
  { icon: Tv, title: "Intelligent Media Park", desc: "Building India's first AI-integrated media production campus." },
  { icon: Cpu, title: "Autonomous Learning Ecosystem", desc: "Self-adaptive training systems with real-time industry alignment." },
  { icon: Shield, title: "Global Cybersecurity Alliances", desc: "Strategic partnerships with global MSSP and threat intelligence leaders." },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>SOXIT Consulting Services | AI-Integrated Consulting, Talent Engineering & Intelligent Media</title>
        <meta name="description" content="SOXIT delivers AI-integrated consulting, talent engineering, and intelligent media services. Building trust, delivering quality across BFSI, Healthcare, Manufacturing and more." />
      </Helmet>

      {/* === HERO === */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-surface-dark/95" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-consulting-accent mb-6 drop-shadow-sm">
              Building Trust. Delivering Quality.
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight drop-shadow-md">
              Where Technology, Intelligence,{" "}
              <span className="text-consulting-accent drop-shadow-sm">and Creativity Converge.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              AI-integrated Consulting, Talent Engineering, and Intelligent Media Infrastructure.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/consulting" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-consulting-accent text-white font-semibold text-sm hover:bg-consulting-accent-hover transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5">
              Explore Consulting <ArrowRight size={16} />
            </Link>
            <Link to="/academia" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-academia text-academia-foreground font-semibold text-sm hover:bg-academia-hover transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5">
              Discover Academia <ArrowRight size={16} />
            </Link>
            <Link to="/open-media" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border-2 border-primary-foreground/40 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 hover:border-primary-foreground/60 transition-all duration-200">
              Experience Open Media <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-consulting-accent"
            />
          </div>
        </motion.div>
      </section>

      {/* === DIVISION OVERVIEW === */}
      <section className="section-enterprise section-light">
        <SectionHeader
          label="Our Divisions"
          title="Three Pillars. One Ecosystem."
          description="SOXIT operates as an integrated enterprise across consulting, education, and media — powered by AI at every level."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {divisions.map((div, i) => (
            <motion.div key={div.title} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.15 }}>
              <Link to={div.link} className={`division-panel ${div.panelClass} group block h-full`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-white/10">
                    <div.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{div.title}</h3>
                </div>
                <p className="text-sm leading-relaxed opacity-80 mb-8">{div.description}</p>
                <div className="mb-6">
                  <div className="text-3xl font-bold">{div.metric}</div>
                  <div className="text-xs opacity-60 mt-1">{div.metricLabel}</div>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  {div.cta} <ChevronRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === METRICS BAR === */}
      <section className="section-dark py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter value={70} label="Operational Optimization" />
          <AnimatedCounter value={40} label="Learning Enhancement" />
          <AnimatedCounter value={50} label="Faster Production" />
          <AnimatedCounter value={99} suffix="%" label="Client Satisfaction" />
        </div>
      </section>

      {/* === WHY SOXIT === */}
      <section className="section-enterprise section-sunken">
        <SectionHeader
          label="Why SOXIT"
          title="Enterprise Credibility, Built In."
          description="We don't just consult — we embed intelligence into every layer of your organization."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {whySoxit.map((item, i) => (
            <motion.div key={item.title} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }} className="metric-card flex gap-5">
              <div className="p-3 rounded-lg bg-consulting-accent/10 h-fit">
                <item.icon size={24} className="text-consulting-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === INDUSTRIES === */}
      <section className="section-enterprise section-light">
        <SectionHeader
          label="Industries"
          title="Driving Impact Across Sectors"
          description="We serve enterprises across critical industries with domain-specific AI solutions."
        />
        <div className="grid-enterprise max-w-7xl mx-auto">
          {industries.map((ind, i) => (
            <motion.div key={ind.name} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.08 }}>
              <Link to="/industries" className="metric-card group flex items-start gap-4 cursor-pointer">
                <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-consulting-accent/10 transition-colors">
                  <ind.icon size={24} className="text-primary group-hover:text-consulting-accent transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground group-hover:text-consulting-accent transition-colors">{ind.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{ind.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === CORPORATE OUTLOOK 2030 === */}
      <section className="section-enterprise section-dark">
        <SectionHeader
          label="Vision 2030"
          title="Corporate Outlook"
          description="Our strategic roadmap to becoming India's leading AI-integrated enterprise."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {outlook.map((item, i) => (
            <motion.div key={item.title} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }}>
              <div className="p-6 md:p-8 rounded-xl border border-surface-dark-foreground/10 hover:border-consulting-accent/30 transition-colors">
                <item.icon size={28} className="text-consulting-accent mb-4" />
                <h3 className="text-lg font-bold text-surface-dark-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-surface-dark-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === CTA BANNER === */}
      <section className="py-20 md:py-28 px-6 gradient-consulting">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Schedule a strategic consultation with our AI-integrated advisory team.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
            Schedule Consultation <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Index;
