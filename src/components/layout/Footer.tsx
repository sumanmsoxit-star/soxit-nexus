import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logoFull from "@/assets/logo-full.png";

const Footer = () => {
  return (
    <footer className="bg-surface-dark text-surface-dark-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logoFull} alt="SOXIT" className="h-8 w-auto brightness-0 invert" />
            <p className="text-sm text-surface-dark-foreground/60 leading-relaxed">Building Trust. Delivering Quality.

              <br />
              AI-Integrated Consulting, Talent Engineering, and Intelligent Media Enterprise.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-surface-dark-foreground/10 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:consult@soxit.in" className="p-2 rounded-md hover:bg-surface-dark-foreground/10 transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Divisions */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-surface-dark-foreground/40">Divisions</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/consulting" className="text-sm hover:text-consulting-accent transition-colors">Consulting</Link>
              <Link to="/academia" className="text-sm hover:text-consulting-accent transition-colors">Academia</Link>
              <Link to="/open-media" className="text-sm hover:text-consulting-accent transition-colors">Open Media</Link>
              <Link to="/industries" className="text-sm hover:text-consulting-accent transition-colors">Industries</Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-surface-dark-foreground/40">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm hover:text-consulting-accent transition-colors">About Us</Link>
              <Link to="/insights" className="text-sm hover:text-consulting-accent transition-colors">Insights</Link>
              <Link to="/careers" className="text-sm hover:text-consulting-accent transition-colors">Careers</Link>
              <Link to="/contact" className="text-sm hover:text-consulting-accent transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-surface-dark-foreground/40">Contact</h4>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-consulting-accent" />
                <span>No: 23-3B/234 & 252, Vasavi Pharma Market Complex,<br />Gollapudi, Vijayawada, Andhra Pradesh 521225</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-consulting-accent" />
                <a href="tel:+919603544647" className="hover:text-consulting-accent transition-colors">+91 96035 44647</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-consulting-accent" />
                <a href="mailto:consult@soxit.in" className="hover:text-consulting-accent transition-colors">consult@soxit.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-surface-dark-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-surface-dark-foreground/40">
          <p>© {new Date().getFullYear()} SOXIT Consulting Services. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-surface-dark-foreground/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-surface-dark-foreground/60 transition-colors">Terms of Service</Link>
            <span>ISO 27001 · SOC 2 Compliant</span>
          </div>
        </div>
      </div>
    </footer>);
};

export default Footer;