import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoFull from "@/assets/logo-full.png";
import logoIcon from "@/assets/logo-icon.png";

const navItems = [
{ label: "Home", path: "/" },
{ label: "Consulting", path: "/consulting" },
{ label: "Academia", path: "/academia" },
{ label: "Open Media", path: "/open-media" },
{ label: "Industries", path: "/industries" },
{ label: "Insights", path: "/insights" },
{ label: "About", path: "/about" },
{ label: "Careers", path: "/careers" },
{ label: "Contact", path: "/contact" }];


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ?
      "bg-surface-elevated/95 backdrop-blur-md shadow-sm border-b border-border" :
      "bg-transparent"}`
      }>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          
          <img src={logoFull} alt="SOXIT Consulting Services" className="hidden md:block h-6 md:h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link px-3 py-2 ${
            location.pathname === item.path ? "active" : ""} ${
            scrolled ? "text-foreground hover:text-consulting-accent" : "text-primary-foreground/80 hover:text-primary-foreground"}`}>

              {item.label}
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          aria-label="Toggle menu">

          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-surface-elevated border-b border-border overflow-hidden">

            <nav className="flex flex-col px-6 py-4 gap-1">
              {navItems.map((item) =>
            <Link
              key={item.path}
              to={item.path}
              className={`py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              location.pathname === item.path ?
              "bg-primary text-primary-foreground" :
              "text-foreground hover:bg-accent"}`
              }>

                  {item.label}
                </Link>
            )}
            </nav>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

};

export default Header;