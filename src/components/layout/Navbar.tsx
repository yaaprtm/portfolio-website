"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageToggle from "@/components/ui/LanguageToggle";
import CommandPalette from "@/components/ui/CommandPalette";
import CvModal from "@/components/ui/CvModal";
import { useLanguage } from "@/context/LanguageContext";

const navKeys = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "education", href: "#education" },
  { key: "certifications", href: "#certifications" },
  { key: "contact", href: "#contact" },
] as const;

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [cmdOpen, setCmdOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navKeys.map((link) => link.href.slice(1));
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[#F0EEE9]/90 backdrop-blur-md border-b border-warm-dark/10 shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Title */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex flex-col group cursor-pointer"
            >
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-warm-dark group-hover:text-olive-500 transition-colors uppercase">
                Arya Putra Pratama
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-olive-500 -mt-1">
                Editorial Portfolio
              </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navKeys.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200",
                      activeSection === link.href.slice(1)
                        ? "text-olive-500 font-bold"
                        : "text-warm-gray hover:text-warm-dark"
                    )}
                  >
                    {activeSection === link.href.slice(1) && (
                      <motion.span
                        layoutId="active-nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-olive-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{t.nav[link.key]}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Utility Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setCvOpen(true)}
                className="px-3.5 py-1.5 rounded-full border border-warm-dark/20 text-xs font-semibold text-warm-dark hover:border-olive-500 hover:text-olive-500 transition-all hidden sm:flex items-center gap-1.5"
              >
                <FileText size={13} className="text-olive-500" />
                <span>{t.nav.previewCV}</span>
              </button>

              <button
                onClick={() => setCmdOpen(true)}
                className="p-2 rounded-full border border-warm-dark/15 text-warm-gray hover:text-warm-dark hover:border-warm-dark/40 transition-all hidden sm:flex items-center"
                title="Command Palette (Ctrl+K)"
              >
                <Command size={14} />
              </button>

              <LanguageToggle />

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-full text-warm-dark hover:bg-warm-card transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-20 z-30 bg-[#F0EEE9] border-b border-warm-dark/10 shadow-xl lg:hidden p-6"
          >
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setMobileOpen(false); setCvOpen(true); }}
                className="w-full py-3 rounded-full bg-olive-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mb-2"
              >
                <FileText size={15} /> {t.nav.viewLiveCV}
              </button>

              {navKeys.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "text-left py-2.5 px-3 rounded-lg font-display text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-between",
                    activeSection === link.href.slice(1)
                      ? "text-olive-500 bg-warm-card"
                      : "text-warm-dark hover:bg-warm-card/60"
                  )}
                >
                  <span>{t.nav[link.key]}</span>
                  <span className="text-xs text-warm-muted font-normal">0{i + 1}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} onOpenCv={() => setCvOpen(true)} />
      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
