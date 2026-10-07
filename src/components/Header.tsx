import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Doctors", path: "/doctors" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"}`}>
      <div className="container-main flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold font-heading text-foreground tracking-tight">SurgiCore</span>
            <span className="text-lg font-bold font-heading text-primary"> Pro</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/staff-login" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Staff Login
          </Link>
          <Link to="/book" className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
            Book Consultation
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="container-main py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border space-y-2">
                <Link to="/staff-login" className="block px-4 py-3 text-sm font-medium text-muted-foreground">Staff Login</Link>
                <Link to="/book" className="block px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center">Book Consultation</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
