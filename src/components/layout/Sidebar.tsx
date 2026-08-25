"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Home,
  User,
  Code,
  FolderGit2,
  Briefcase,
  Award,
  Mail,
  FileText,
  Command,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import CommandPalette from "@/components/ui/CommandPalette";
import CvModal from "@/components/ui/CvModal";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Certifications", href: "#certifications", icon: Award },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [currentTime, setCurrentTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  // Real-time clock update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " WIB"
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Active section scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPos = window.scrollY + 160;

      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ============================================================
          1. DESKTOP FIXED SIDEBAR (lg breakpoint and up: >= 1024px)
         ============================================================ */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 w-72 xl:w-80 bg-navy-950/90 backdrop-blur-2xl border-r border-white/10 p-6 z-40 justify-between overflow-y-auto">
        {/* Top Profile Header */}
        <div>
          <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-white/10">
            {/* Small Avatar Frame */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-neon/40 flex-shrink-0 shadow-lg bg-navy-900">
              <Image
                src="/images/arya-photo.png"
                alt="Arya Putra Pratama"
                width={48}
                height={48}
                className="object-cover object-top w-full h-full"
                priority
              />
            </div>

            <div className="min-w-0">
              <h2 className="font-bold text-slate-100 text-sm truncate tracking-tight">
                Arya Putra Pratama
              </h2>
              <p className="text-slate-400 text-[11px] font-mono truncate mt-0.5">
                PENS · STr. Rekayasa Internet
              </p>
            </div>
          </div>

          {/* Status Indicator & Live Real-Time Clock */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
                <span className="text-slate-300">Available for work</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-cyan-neon" />
                <span>Time:</span>
              </div>
              <span className="text-slate-200 font-semibold">{currentTime || "00:00:00 WIB"}</span>
            </div>
          </div>

          {/* Vertical Navigation Menu */}
          <nav className="space-y-1">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-3 mb-2">
              {"// Navigation"}
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.slice(1);

              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all text-left group min-h-[44px]",
                    isActive
                      ? "bg-cyan-soft text-cyan-neon border border-cyan-neon/30 font-semibold shadow-sm"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={16}
                      className={cn(
                        "transition-colors",
                        isActive ? "text-cyan-neon" : "text-slate-500 group-hover:text-slate-300"
                      )}
                    />
                    <span>{item.label}</span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-cyan-neon"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & Palette Tool */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setCvOpen(true)}
              className="flex-1 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-mono text-slate-300 hover:text-cyan-neon hover:border-cyan-neon/30 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <FileText size={14} className="text-cyan-neon" />
              <span>Preview CV</span>
            </button>

            <ThemeSwitcher />
          </div>

          <button
            onClick={() => setCmdOpen(true)}
            className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-mono text-slate-400 hover:text-slate-200 transition-all flex items-center justify-between min-h-[44px]"
          >
            <div className="flex items-center gap-2">
              <Command size={13} />
              <span>Command</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-slate-400">
              Ctrl K
            </kbd>
          </button>
        </div>
      </aside>

      {/* ============================================================
          2. MOBILE TOP STICKY BAR & HAMBURGER SLIDE-IN (mobile: < 1024px)
         ============================================================ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-navy-950/90 backdrop-blur-xl border-b border-white/10 px-4 h-16 flex items-center justify-between">
        {/* Mobile Header Title */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-cyan-neon/40 flex-shrink-0 bg-navy-900">
            <Image
              src="/images/arya-photo.png"
              alt="Arya"
              width={32}
              height={32}
              className="object-cover object-top w-full h-full"
            />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-xs truncate">Arya Putra Pratama</h1>
            <p className="text-[10px] text-cyan-neon font-mono truncate">PENS Surabaya</p>
          </div>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCvOpen(true)}
            className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-[11px] font-mono text-cyan-neon flex items-center gap-1 min-h-[44px]"
          >
            <FileText size={13} />
            <span>CV</span>
          </button>

          <ThemeSwitcher />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-cyan-neon transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 z-50 w-72 bg-navy-950/95 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-neon/40">
                      <Image
                        src="/images/arya-photo.png"
                        alt="Arya"
                        width={40}
                        height={40}
                        className="object-cover object-top w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm">Arya Putra Pratama</h3>
                      <p className="text-[11px] font-mono text-cyan-neon">STr. Teknik Rekayasa Internet</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.slice(1);

                    return (
                      <button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono transition-all text-left min-h-[44px]",
                          isActive
                            ? "bg-cyan-soft text-cyan-neon border border-cyan-neon/30 font-semibold"
                            : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                        )}
                      >
                        <Icon size={16} className={isActive ? "text-cyan-neon" : "text-slate-500"} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCmdOpen(true);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-xs font-mono text-slate-300 flex items-center justify-between min-h-[44px]"
                >
                  <div className="flex items-center gap-2">
                    <Command size={14} className="text-cyan-neon" />
                    <span>Open Command Palette</span>
                  </div>
                  <kbd className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-slate-400">
                    Ctrl K
                  </kbd>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} onOpenCv={() => setCvOpen(true)} />
      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
