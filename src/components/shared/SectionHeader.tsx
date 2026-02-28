import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  accentClass?: string;
}

const SectionHeader = ({ label, title, description, align = "center", light = false, accentClass = "text-consulting-accent" }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}`}
    >
      {label && (
        <span className={`text-xs font-semibold uppercase tracking-[0.2em] mb-3 block ${accentClass}`}>
          {label}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${light ? "text-surface-dark-foreground" : "text-foreground"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? "text-surface-dark-foreground/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
