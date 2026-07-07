import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Phone, Mail, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openQuoteModal: () => void;
}

export default function Header({ activeTab, setActiveTab, openQuoteModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "warranty", label: "Warranty" },
    { id: "testimonials", label: "Testimonials" },
    { id: "gallery", label: "Gallery" },
    { id: "blog", label: "Blog" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Banner Contact */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-6 md:px-8 border-b border-slate-800 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <a href="tel:+919677545615" className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span>+91 96775 45615</span>
          </a>
          <a href="tel:+919363938677" className="flex items-center gap-1.5 hover:text-amber-500 transition-colors hidden sm:flex">
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span>+91 93639 38677</span>
          </a>
          <a href="mailto:admin@nkpbuilders.com" className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
            <Mail className="w-3.5 h-3.5 text-amber-500" />
            <span>admin@nkpbuilders.com</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-[11px] hidden md:inline">Tamil Nadu, India</span>
          <div className="flex items-center gap-1 text-[11px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>5 Years Asian Paints & Dam Sheath Warranty Protected</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-slate-800 py-3"
            : "bg-slate-900 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group text-left cursor-pointer"
            id="logo-brand-btn"
          >
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 p-2 rounded-lg font-black tracking-wider text-xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              NKP
            </div>
            <div>
              <h1 className="text-white font-bold text-lg sm:text-xl tracking-tight leading-none flex items-center gap-1.5">
                NKP BUILDERS
                <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-widest font-semibold font-mono">
                  Corp
                </span>
              </h1>
              <p className="text-[11px] text-amber-500 uppercase tracking-widest mt-0.5 font-medium leading-none">
                Building Trust. Delivering Quality.
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-[13px] font-medium transition-all rounded-md relative cursor-pointer ${
                  activeTab === item.id
                    ? "text-amber-500"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action Call Now */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={openQuoteModal}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-2 rounded-lg text-sm font-bold tracking-tight shadow-lg shadow-amber-500/10 transition-all duration-300 flex items-center gap-1.5 group cursor-pointer"
              id="header-quote-btn"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={openQuoteModal}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              id="mobile-header-quote-btn"
            >
              Get Quote
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle menu"
              id="menu-trigger-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-0 top-[110px] z-30 bg-slate-950 border-b border-slate-800 shadow-2xl py-4 px-6 flex flex-col gap-2 lg:hidden max-h-[80vh] overflow-y-auto"
        >
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-2.5 px-4 rounded-lg text-sm text-left font-semibold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-4 flex flex-col gap-3">
            <div className="text-xs text-slate-400 font-medium">Quick Support Lines:</div>
            <a
              href="tel:+919677545615"
              className="flex items-center gap-2.5 text-sm text-white font-semibold hover:text-amber-500 bg-slate-900 py-2.5 px-4 rounded-lg border border-slate-800"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Call: +91 96775 45615</span>
            </a>
            <a
              href="https://wa.me/919677545615?text=Hello%20NKP%20Builders,%20I%20would%20like%20to%20request%20a%20free%20site%20visit."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 text-sm text-white font-semibold hover:text-amber-500 bg-emerald-950/50 text-emerald-400 py-2.5 px-4 rounded-lg border border-emerald-900"
            >
              <svg className="w-4 h-4 text-emerald-500 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.022-.015-.022-.015-.502-.255-.479-.24-2.384-1.155-2.756-1.289-.373-.133-.64-.2-.905.2-.267.4-.999 1.24-1.227 1.5-.227.26-.454.293-.93.053-.477-.24-2.015-.719-3.836-2.356-1.417-1.27-2.37-2.834-2.648-3.31-.28-.48-.03-.739.201-.977.208-.21.455-.54.68-.81.23-.27.307-.46.46-.77.153-.3.076-.563-.038-.803-.115-.24-.905-2.18-1.24-2.99-.327-.81-.661-.7-.905-.712-.228-.013-.49-.013-.753-.013-.262 0-.69.1-1.054.495-.364.395-1.39 1.358-1.39 3.3 0 1.942 1.41 3.82 1.61 4.08.2.26 2.78 4.248 6.72 5.9 1.054.442 1.877.705 2.518.913.96.307 1.83.263 2.517.16.767-.111 2.385-.975 2.724-1.92.339-.944.339-1.754.24-1.92-.1-.16-.36-.26-.838-.5z" />
              </svg>
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
