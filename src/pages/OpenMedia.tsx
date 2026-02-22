import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Video, Palette, BarChart3, Building, Wand2, Mic, Eye, TrendingUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";

const capabilities = [
  { icon: Wand2, title: "AI Text / Video / Audio", desc: "Generative content production at scale with AI-powered creative tools." },
  { icon: Palette, title: "Generative Design", desc: "AI-assisted visual design, branding, and identity creation." },
  { icon: Eye, title: "Predictive Audience Mapping", desc: "Machine learning models that predict audience engagement and preferences." },
  { icon: Video, title: "Automated Post Production", desc: "AI-driven editing, color grading, sound mixing, and quality enhancement." },
];

const mediaPark = [
  { title: "AI Studios", desc: "State-of-the-art production studios with integrated AI creative tools." },
  { title: "Editing Hubs", desc: "Collaborative editing suites with AI-assisted workflows." },
  { title: "AR/VR Labs", desc: "Immersive technology labs for next-generation content creation." },
  { title: "Creative Coworking", desc: "Shared creative spaces for freelancers, agencies, and enterprise teams." },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const OpenMediaPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Open Media - AI Creative Production | SOXIT</title>
        <meta name="description" content="SOXIT Open Media combines AI-powered creative production, brand strategy, and intelligent media infrastructure for next-generation content." />
      </Helmet>

      {/* Hero */}
      <section className="bg-media pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-media-accent mb-4 block">Open Media</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-media-foreground leading-tight max-w-3xl">
              Where Creativity Meets Intelligence.
            </h1>
            <p className="mt-6 text-lg text-media-foreground/70 max-w-2xl leading-relaxed">
              AI-powered content production, brand strategy, and intelligent media infrastructure for the modern enterprise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Creative Production */}
      <section className="section-enterprise section-light">
        <SectionHeader label="Capabilities" title="AI Creative Production" description="End-to-end creative production enhanced by artificial intelligence." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {capabilities.map((c, i) => (
            <motion.div key={c.title} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }}>
              <div className="metric-card flex gap-5">
                <div className="p-3 rounded-lg bg-media-accent/10 h-fit">
                  <c.icon size={24} className="text-media-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand & Strategy */}
      <section className="section-enterprise section-sunken">
        <SectionHeader label="Strategy" title="Branding & Campaign Intelligence" description="Data-driven branding and marketing strategy powered by AI analytics." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: BarChart3, title: "Analytics Dashboards", desc: "Real-time campaign performance tracking and audience insights." },
            { icon: TrendingUp, title: "Campaign Forecasting", desc: "Predictive models for campaign ROI and audience reach." },
            { icon: Mic, title: "Automated Reporting", desc: "AI-generated reports with actionable insights and recommendations." },
          ].map((item, i) => (
            <motion.div key={item.title} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }}>
              <div className="metric-card text-center">
                <div className="p-3 rounded-lg bg-media-accent/10 w-fit mx-auto mb-4">
                  <item.icon size={24} className="text-media-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Intelligent Media Park */}
      <section className="section-enterprise section-dark">
        <SectionHeader label="Infrastructure" title="Intelligent Media Park" description="India's first AI-integrated creative production campus." light />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {mediaPark.map((m, i) => (
            <motion.div key={m.title} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }}>
              <div className="p-6 rounded-xl border border-surface-dark-foreground/10 hover:border-media-accent/30 transition-colors">
                <h3 className="font-bold text-surface-dark-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-surface-dark-foreground/60">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-media-accent">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-media-accent-foreground mb-6">Produce Smarter</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-media text-media-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              Book Studio <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-media-accent-foreground/30 text-media-accent-foreground font-semibold text-sm hover:bg-media-accent-foreground/10 transition-colors">
              Partner With Us <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default OpenMediaPage;
