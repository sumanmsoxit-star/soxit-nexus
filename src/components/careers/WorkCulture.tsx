import { motion } from "framer-motion";
import { Clock, Lightbulb, Users, GraduationCap } from "lucide-react";

const cultureCards = [
  {
    icon: Clock,
    title: "Flexible Work Model",
    points: [
      "4 Days per Week",
      "6 Hours per Day",
      "Performance over presence",
      "Output-driven accountability",
    ],
  },
  {
    icon: Lightbulb,
    title: "Innovation-First Environment",
    points: [
      "Research, Innovate, Invent",
      "Encouragement for experimentation",
      "Hackathons & internal labs",
      "Access to cutting-edge tools",
    ],
  },
  {
    icon: Users,
    title: "Inclusive Collaboration",
    points: [
      "Gen Z + Millennials model",
      "Open idea exchange",
      "Every opinion valued",
      "Flat communication hierarchy",
    ],
  },
  {
    icon: GraduationCap,
    title: "Growth & Learning",
    points: [
      "Sponsored certifications",
      "Cross-domain mobility",
      "Exposure to GCC-level projects",
      "Mentorship programs",
    ],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const WorkCulture = () => {
  return (
    <section className="section-enterprise section-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-consulting-accent mb-3 block">
            Our Culture
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-surface-dark-foreground">
            Life at SOXIT
          </h2>
          <p className="mt-4 text-surface-dark-foreground/60 max-w-2xl mx-auto">
            A modern workplace built for high-performance individuals who value flexibility, innovation, and growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cultureCards.map((card, i) => (
            <motion.div
              key={card.title}
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-lg border border-border/10 bg-surface-dark-foreground/5 p-6 hover:bg-surface-dark-foreground/10 transition-colors duration-300"
            >
              <card.icon size={28} className="text-consulting-accent mb-4" />
              <h3 className="font-bold text-surface-dark-foreground mb-3">{card.title}</h3>
              <ul className="space-y-2">
                {card.points.map((point) => (
                  <li key={point} className="text-sm text-surface-dark-foreground/60 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-consulting-accent mt-2 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkCulture;
