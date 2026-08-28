"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import SoundToggle from "@/components/ui/SoundToggle";
import { useLanguage } from "@/context/LanguageContext";

// Lazy load modals yang jarang dibuka
const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette"));
const CvModal = dynamic(() => import("@/components/ui/CvModal"));

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

  // Listen for global Ctrl+K event
  useEffect(() => {
    const handleOpenCommandPalette = () => {
      setCmdOpen(true);
    };

    window.addEventListener("openCommandPalette", handleOpenCommandPalette);
    return () => window.removeEventListener("openCommandPalette", handleOpenCommandPalette);
  }, []);

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
            ? "bg-[#FAFAFA]/90 backdrop-blur-md border-b border-mono-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Title - Compact */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="flex flex-col group cursor-pointer flex-shrink-0"
            >
              <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-mono-black group-hover:text-mono-gray transition-colors uppercase whitespace-nowrap leading-none mb-0.5">
                ARYA PUTRA PRATAMA
              </span>
              <span className="text-[9px] tracking-widest uppercase font-bold text-mono-gray whitespace-nowrap">
                IT ENTHUSIAST · PORTFOLIO
              </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {navKeys.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative px-2 xl:px-2.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase transition-all duration-200",
                      activeSection === link.href.slice(1)
                        ? "text-mono-black font-extrabold"
                        : "text-mono-gray hover:text-mono-black"
                    )}
                  >
                    {activeSection === link.href.slice(1) && (
                      <motion.span
                        layoutId="active-nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-mono-black"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{t.nav[link.key]}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Utility Buttons - Compact */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setCvOpen(true)}
                className="px-2.5 xl:px-3 py-1.5 rounded-full border border-mono-black text-[11px] font-bold text-mono-black hover:bg-mono-black hover:text-white transition-all hidden sm:flex items-center gap-1"
              >
                <FileText size={12} className="text-current" />
                <span className="hidden xl:inline">{t.nav.previewCV}</span>
                <span className="xl:hidden">CV</span>
              </button>

              <button
                onClick={() => setCmdOpen(true)}
                className="p-2 rounded-full border border-mono-border text-mono-gray hover:text-mono-black hover:border-mono-black transition-all hidden sm:flex items-center"
                title="Command Palette (Ctrl+K)"
              >
                <Command size={13} />
              </button>

              <LanguageToggle />
              <ThemeSwitcher />
              <SoundToggle />

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-full text-mono-black hover:bg-mono-card transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            className="fixed inset-x-0 top-20 z-30 bg-[#FAFAFA] border-b border-mono-border shadow-xl lg:hidden p-6"
          >
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setMobileOpen(false); setCvOpen(true); }}
                className="w-full py-3 rounded-full bg-mono-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 mb-2"
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
                      ? "text-mono-black bg-mono-card font-extrabold"
                      : "text-mono-gray hover:bg-mono-card/60"
                  )}
                >
                  <span>{t.nav[link.key]}</span>
                  <span className="text-xs text-mono-muted font-normal">0{i + 1}</span>
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
