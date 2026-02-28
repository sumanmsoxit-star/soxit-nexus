import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Video, Palette, BarChart3, Wand2, Mic, Eye, TrendingUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";
import VideoHero from "@/components/shared/VideoHero";
import openmediaVideo from "@/assets/videos/openmedia-hero.mp4";
import heroBg from "@/assets/hero-bg.jpg";

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
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SOXIT OpenMedia",
          "description": "Co-working spaces and production studios for creators and innovators.",
          "url": "https://soxit.in/open-media"
        })}</script>
      </Helmet>

      <VideoHero
        videoSrc={openmediaVideo}
        fallbackImage={heroBg}
        label="OpenMedia"
        headline="Where Creativity Meets Infrastructure"
        subtext="Co-working spaces and production studios for creators and innovators."
        ctaText="Explore OpenMedia"
        ctaLink="#capabilities"
        overlayClass="bg-primary/70"
        accentClass="text-media-accent"
        ctaClass="btn-media"
      />

      {/* AI Creative Production */}
      <section id="capabilities" className="section-enterprise section-light">
        <SectionHeader label="Capabilities" title="AI Creative Production" description="End-to-end creative production enhanced by artificial intelligence." accentClass="text-media-accent" />
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
        <SectionHeader label="Strategy" title="Branding & Campaign Intelligence" description="Data-driven branding and marketing strategy powered by AI analytics." accentClass="text-media-accent" />
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
        <SectionHeader label="Infrastructure" title="Intelligent Media Park" description="India's first AI-integrated creative production campus." light accentClass="text-media-accent" />
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
      <section className="py-20 px-6 gradient-media">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Produce Smarter</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              Book Studio <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-foreground/30 text-foreground font-semibold text-sm hover:bg-foreground/10 transition-colors">
              Partner With Us <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default OpenMediaPage;
