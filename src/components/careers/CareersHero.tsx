import { motion } from "framer-motion";
import { ArrowDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const CareersHero = () => {
  const scrollToPositions = () => {
    document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-primary pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-consulting-accent/20 via-transparent to-academia/10 animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-consulting-accent/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-academia/5 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--consulting-accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--consulting-accent)) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-consulting-accent mb-4 block">
            Careers at SOXIT
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
            Build the Future of AI, Cloud &amp; Cybersecurity with{" "}
            <span className="text-consulting-accent">SOXIT.</span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            We are hiring across AI, Data, Cybersecurity, Cloud, Engineering and Digital Transformation domains aligned to global capability center (GCC) demand.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button
              onClick={scrollToPositions}
              size="lg"
              className="btn-consulting gap-2">
              
              View Open Roles <ArrowDown size={16} />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10">
              
              <a href="#open-positions" className="text-amber-600">
                <Send size={16} className="mr-2" /> Apply Now
              </a>
            </Button>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            {[
            { value: "5+", label: "Domains" },
            { value: "30+", label: "Open Roles" },
            { value: "6", label: "Locations" },
            { value: "GCC", label: "Aligned" }].
            map((stat) =>
            <div key={stat.label}>
                <p className="text-2xl font-bold text-consulting-accent">{stat.value}</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

};

export default CareersHero;