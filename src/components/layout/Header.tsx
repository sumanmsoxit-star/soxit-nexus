import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoFull from "@/assets/logo-full.png";
import logoIcon from "@/assets/logo-icon.png";

const divisions = [
  { label: "Consulting", path: "/consulting", className: "bg-consulting-accent text-white hover:bg-consulting-accent-hover shadow-sm" },
  { label: "Academia", path: "/academia", className: "bg-academia text-academia-foreground hover:bg-academia-hover shadow-sm" },
  { label: "OpenMedia", path: "/open-media", className: "bg-media-accent text-media-accent-foreground hover:bg-media-accent-hover shadow-sm" },
];

const secondaryNav = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Industries", path: "/industries" },
  { label: "Insights", path: "/insights" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface-elevated/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-primary backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logoIcon} alt="" className="h-8 w-auto md:hidden" />
            <img
              src={logoFull}
              alt="SOXIT Consulting Services"
              className={`hidden md:block h-7 w-auto transition-all duration-300 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Division CTA Buttons — Desktop */}
          <nav className="hidden md:flex items-center gap-3" aria-label="Primary divisions">
            {divisions.map((div) => (
              <Link
                key={div.path}
                to={div.path}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 ${div.className} ${
                  location.pathname === div.path ? "ring-2 ring-offset-2 ring-offset-transparent ring-white/40" : ""
                }`}
              >
                {div.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger Toggle */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-foreground hover:bg-accent"
                : "text-primary-foreground hover:bg-primary-foreground/10"
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Off-canvas Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-80 max-w-[85vw] bg-surface-elevated shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Menu</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg text-foreground hover:bg-accent transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Division buttons — Mobile */}
              <div className="md:hidden px-6 pt-6 pb-4 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Divisions</span>
                {divisions.map((div) => (
                  <Link
                    key={div.path}
                    to={div.path}
                    className={`flex items-center justify-between w-full px-5 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 ${div.className}`}
                  >
                    {div.label}
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>

              {/* Secondary Nav */}
              <nav className="flex-1 overflow-y-auto px-6 py-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">Navigate</span>
                <ul className="space-y-1">
                  {secondaryNav.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          location.pathname === item.path
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="px-6 py-4 border-t border-border">
                <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SOXIT Consulting Services</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
