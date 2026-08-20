"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
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
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-navy-950/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/30"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Quick Tools: Live CV + Command Palette */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCvOpen(true)}
                className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-mono text-slate-300 hover:text-cyan-neon hover:border-cyan-neon/30 transition-all flex items-center gap-1.5"
              >
                <FileText size={14} className="text-cyan-neon" />
                <span className="hidden sm:inline">{t.nav.previewCV}</span>
              </button>

              <button
                onClick={() => setCmdOpen(true)}
                className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-mono text-slate-400 hover:text-slate-200 transition-all hidden sm:flex items-center gap-2"
                title="Tekan Ctrl+K"
              >
                <Command size={13} />
                <span>{t.nav.command}</span>
                <kbd className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-slate-400">Ctrl K</kbd>
              </button>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1 sm:gap-2">
              {navKeys.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative px-3 py-1.5 text-xs sm:text-sm font-medium font-mono transition-all duration-200 rounded-md",
                      activeSection === link.href.slice(1)
                        ? "text-cyan-neon"
                        : "text-slate-400 hover:text-slate-200"
                    )}
                  >
                    {activeSection === link.href.slice(1) && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-cyan-soft rounded-md border border-cyan-neon/30"
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{t.nav[link.key]}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Tools: Language Toggle + Dark Mode Toggle + Theme Switcher + Mobile Menu */}
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <DarkModeToggle />
              <ThemeSwitcher />

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl text-slate-400 hover:text-cyan-neon hover:bg-white/5 transition-all"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-navy-900/95 backdrop-blur-xl border-l border-white/5 md:hidden"
          >
            <div className="flex flex-col pt-20 px-6 gap-1">
              <button
                onClick={() => { setMobileOpen(false); setCvOpen(true); }}
                className="mb-3 px-4 py-3 rounded-xl bg-cyan-neon text-navy-950 font-mono text-xs font-bold flex items-center justify-center gap-2"
              >
                <FileText size={16} /> {t.nav.viewLiveCV}
              </button>

              {navKeys.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "text-left px-4 py-3 rounded-lg font-mono text-sm transition-all",
                    activeSection === link.href.slice(1)
                      ? "text-cyan-neon bg-cyan-soft border border-cyan-neon/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  <span className="text-cyan-neon/40 mr-2">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {t.nav[link.key]}
                </motion.button>
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
