import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface VideoHeroProps {
  videoSrc: string;
  fallbackImage?: string;
  label: string;
  headline: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  overlayClass?: string;
  accentClass?: string;
  ctaClass?: string;
}

const VideoHero = ({
  videoSrc, fallbackImage, label, headline, subtext, ctaText, ctaLink,
  overlayClass = "bg-primary/70",
  accentClass = "text-consulting-accent",
  ctaClass = "btn-consulting",
}: VideoHeroProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay muted loop playsInline preload="metadata" poster={fallbackImage}
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 ${overlayClass}`} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className={`inline-block text-xs font-semibold uppercase tracking-[0.3em] ${accentClass} mb-6`}>
            {label}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
            {headline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {subtext}
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-10">
          <Link
            to={ctaLink}
            className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm hover:scale-105 transform duration-200 ${ctaClass}`}
          >
            {ctaText} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoHero;
