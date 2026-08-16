"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, SkipForward, ArrowUpRight, CheckCircle2, Network, Shield, Radio, Cpu } from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Button from "@/components/ui/Button";

interface BootStep {
  cmd: string;
  output: string;
}

const bootSequence: BootStep[] = [
  {
    cmd: "network --discover-nodes",
    output: "[OK] Topology Map Discovered. Core Router (Home) online.",
  },
  {
    cmd: "whoami",
    output: "Arya Putra Pratama — Network Engineer, IT Support Technician & Android Developer",
  },
  {
    cmd: "education --current",
    output: "STr. Teknik Rekayasa Internet · Politeknik Elektronika Negeri Surabaya (PENS) '26 - '30",
  },
  {
    cmd: "experience --highlight",
    output: "Android Dev Intern @ BRIN (Kebun Raya Cibinong App)",
  },
  {
    cmd: "status.availability",
    output: "Available for internships, projects, and collaborative opportunities",
  },
];

export default function TerminalHero() {
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [currentCmdText, setCurrentCmdText] = useState<string>("");
  const [isBootFinished, setIsBootFinished] = useState<boolean>(false);
  const [skipped, setSkipped] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isBootFinished) {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBootFinished]);

  // Typing animation for boot sequence
  useEffect(() => {
    if (skipped || isBootFinished) return;

    if (completedSteps >= bootSequence.length) {
      setIsBootFinished(true);
      return;
    }

    const currentStep = bootSequence[completedSteps];
    const fullCmd = currentStep.cmd;

    if (currentCmdText.length < fullCmd.length) {
      const timeout = setTimeout(() => {
        setCurrentCmdText(fullCmd.slice(0, currentCmdText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCompletedSteps((prev) => prev + 1);
        setCurrentCmdText("");
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [completedSteps, currentCmdText, skipped, isBootFinished]);

  const handleSkip = () => {
    setSkipped(true);
    setCompletedSteps(bootSequence.length);
    setIsBootFinished(true);
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen pt-28 sm:pt-36 pb-16 flex items-center justify-center overflow-hidden"
    >
      <NetworkBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Terminal Window Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl bg-navy-950/85"
        >
          {/* Terminal Window Header Bar */}
          <div className="px-4 py-3 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="font-mono text-xs text-slate-400 ml-2 flex items-center gap-1.5">
                <Network size={13} className="text-cyan-neon" />
                topology-node://core-router-home
              </span>
            </div>

            {/* Skip Button */}
            {!isBootFinished && (
              <button
                onClick={handleSkip}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white font-mono text-[10px] flex items-center gap-1 transition-all"
                title="Tekan ESC untuk skip"
              >
                <SkipForward size={11} />
                <span>Skip</span>
                <kbd className="px-1 py-0.2 rounded bg-black/40 text-[9px]">ESC</kbd>
              </button>
            )}

            {isBootFinished && (
              <span className="font-mono text-[10px] text-cyan-neon bg-cyan-soft px-2 py-0.5 rounded border border-cyan-neon/30 flex items-center gap-1">
                <CheckCircle2 size={11} /> CORE ONLINE
              </span>
            )}
          </div>

          {/* Terminal Body */}
          <div
            ref={containerRef}
            className="p-5 sm:p-7 font-mono text-xs sm:text-sm space-y-4 max-h-[420px] overflow-y-auto leading-relaxed text-slate-200"
          >
            {/* Previously Completed Boot Steps */}
            {bootSequence.slice(0, completedSteps).map((step, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-neon font-semibold">
                  <span className="text-slate-500">$</span>
                  <span>{step.cmd}</span>
                </div>
                <div className="text-slate-300 pl-4 border-l-2 border-cyan-neon/40 text-xs sm:text-sm">
                  {step.output}
                </div>
              </div>
            ))}

            {/* Currently Typing Command */}
            {!isBootFinished && completedSteps < bootSequence.length && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-neon font-semibold">
                  <span className="text-slate-500">$</span>
                  <span>{currentCmdText}</span>
                  <span className="w-2 h-4 bg-cyan-neon animate-pulse inline-block" />
                </div>
              </div>
            )}

            {/* Main Post-Boot Showcase Headline */}
            {isBootFinished && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-4 border-t border-white/10 space-y-4 font-sans"
              >
                <div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
                    Arya Putra <span className="text-cyan-neon">Pratama</span>
                  </h1>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl font-normal leading-relaxed">
                    Praktisi IT, Spesialis Jaringan Komputer & IT Support, serta Android Developer dengan fokus pada solusi infrastruktur digital modern.
                  </p>
                </div>

                {/* Quick Highlights */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                  <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300">
                    🎓 STr. Teknik Rekayasa Internet @ PENS
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300">
                    📱 Android Dev Intern @ BRIN
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300">
                    🌐 MikroTik MTCNA (88%)
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Terminal Footer Bar with Post-Boot Actions */}
          {isBootFinished && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="p-4 bg-white/[0.02] border-t border-white/10 flex flex-wrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <Button variant="primary" size="md" href="#projects">
                  Lihat Proyek <ArrowUpRight size={16} className="ml-1" />
                </Button>
                <Button variant="secondary" size="md" href="#contact">
                  Hubungi Saya
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="#about"
                  className="text-xs font-mono text-slate-400 hover:text-cyan-neon transition-colors"
                >
                  Pelajari Lebih Lanjut ↓
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
