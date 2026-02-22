import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, BookOpen, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeader from "@/components/shared/SectionHeader";

const articles = [
  { category: "AI & Consulting", title: "How AI is Reshaping Enterprise Technology Advisory", excerpt: "The integration of artificial intelligence into traditional consulting frameworks is creating unprecedented value for enterprise clients.", date: "Feb 2026", readTime: "8 min read" },
  { category: "Cybersecurity", title: "Zero Trust Architecture: A Practical Implementation Guide", excerpt: "A comprehensive look at implementing zero trust security models across distributed enterprise environments.", date: "Jan 2026", readTime: "12 min read" },
  { category: "EdTech", title: "The Role-Ready Revolution in IT Education", excerpt: "Why traditional course-based training is failing graduates, and how role-aligned education is changing the game.", date: "Jan 2026", readTime: "6 min read" },
  { category: "Media Intelligence", title: "AI-Powered Content Production at Scale", excerpt: "How generative AI is transforming media production workflows and enabling hyper-personalized content creation.", date: "Dec 2025", readTime: "10 min read" },
  { category: "Cloud", title: "Multi-Cloud Strategy for the Modern Enterprise", excerpt: "Navigating the complexities of AWS, Azure, and GCP in a unified enterprise cloud architecture.", date: "Dec 2025", readTime: "9 min read" },
  { category: "Industry Trends", title: "BFSI Digital Transformation: 2026 Outlook", excerpt: "Key technology trends shaping the banking and financial services industry in the coming year.", date: "Nov 2025", readTime: "7 min read" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const InsightsPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Insights & Blog | SOXIT - Enterprise Technology Perspectives</title>
        <meta name="description" content="Explore SOXIT's insights on AI consulting, cybersecurity, EdTech, media intelligence, and enterprise technology trends." />
      </Helmet>

      <section className="bg-primary pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-consulting-accent mb-4 block">Insights</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight max-w-3xl">
              Perspectives on Technology & Innovation
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-enterprise section-light">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((a, i) => (
            <motion.article key={a.title} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.08 }}>
              <div className="metric-card group cursor-pointer h-full flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-consulting-accent mb-3">{a.category}</span>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-consulting-accent transition-colors">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{a.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">{a.date} · {a.readTime}</span>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-consulting-accent transition-colors" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default InsightsPage;
