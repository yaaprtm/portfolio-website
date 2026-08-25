"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SkipForward, ArrowUpRight, CheckCircle2, Network } from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

// Lazy-load Three.js canvas — SSR off (requires browser APIs)
const AvatarCanvas = dynamic(
  () => import("@/components/three/AvatarCanvas"),
  { ssr: false }
);

export default function TerminalHero() {
  const { t } = useLanguage();

  const bootSequence = useMemo(
    () => [
      { cmd: "network --discover-nodes", output: t.hero.boot.discover },
      { cmd: "whoami", output: t.hero.boot.whoami },
      { cmd: "interests --explore", output: t.hero.boot.interests },
      { cmd: "education --current", output: t.hero.boot.education },
      { cmd: "experience --highlight", output: t.hero.boot.experience },
      { cmd: "status.availability", output: t.hero.boot.availability },
    ],
    [t]
  );

  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [currentCmdText, setCurrentCmdText] = useState<string>("");
  const [isBootFinished, setIsBootFinished] = useState<boolean>(false);
  const [skipped, setSkipped] = useState<boolean>(false);

  // CTA hover state — passed down to 3D avatar for smile expression
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset animation when language changes
  useEffect(() => {
    setCompletedSteps(0);
    setCurrentCmdText("");
    setIsBootFinished(false);
    setSkipped(false);
  }, [t]);

  const handleSkip = useCallback(() => {
    setSkipped(true);
    setCompletedSteps(bootSequence.length);
    setIsBootFinished(true);
  }, [bootSequence.length]);

  // Keyboard shortcut ESC to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isBootFinished) {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBootFinished, handleSkip]);

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
  }, [completedSteps, currentCmdText, skipped, isBootFinished, bootSequence]);


  // CTA hover handlers
  const handleCTAEnter = useCallback(() => setIsHoveringCTA(true), []);
  const handleCTALeave = useCallback(() => setIsHoveringCTA(false), []);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen pt-28 sm:pt-36 pb-16 flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <NetworkBackground />

      {/* ── 2-column grid: Terminal (left) + Avatar (right) ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* ── Left Column: Terminal content ────────────────────────── */}
          <div className="w-full lg:flex-1 lg:min-w-0">
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
                    <span>{t.hero.skip}</span>
                    <kbd className="px-1 py-0.2 rounded bg-black/40 text-[9px]">ESC</kbd>
                  </button>
                )}

                {isBootFinished && (
                  <span className="font-mono text-[10px] text-cyan-neon bg-cyan-soft px-2 py-0.5 rounded border border-cyan-neon/30 flex items-center gap-1">
                    <CheckCircle2 size={11} /> {t.hero.bootOnline}
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
                        {t.hero.tagline}
                      </p>
                    </div>

                    {/* Quick Highlights */}
                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                      <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300">
                        {t.about.chips.enthusiast}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300">
                        {t.about.chips.solver}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300">
                        {t.about.chips.learner}
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
                  {/* CTA buttons — hover triggers avatar smile expression */}
                  <div
                    className="flex items-center gap-3"
                    onMouseEnter={handleCTAEnter}
                    onMouseLeave={handleCTALeave}
                  >
                    <Button variant="primary" size="md" href="#projects" id="hero-cta-projects">
                      {t.hero.viewProjects} <ArrowUpRight size={16} className="ml-1" />
                    </Button>
                    <Button variant="secondary" size="md" href="#contact" id="hero-cta-contact">
                      {t.hero.contact}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="#about"
                      className="text-xs font-mono text-slate-400 hover:text-cyan-neon transition-colors"
                    >
                      {t.hero.learnMore}
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* ── Right Column: 3D Avatar ───────────────────────────────── */}
          {/* Hidden on mobile to avoid obscuring terminal; shown on lg+ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex flex-col items-center justify-center flex-shrink-0"
            style={{ width: "320px", height: "480px" }}
            aria-hidden="false"
          >
            {/* Glow ring behind avatar */}
            <div
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{
                width: "260px",
                height: "260px",
                background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
              }}
            />

            {/* Avatar Canvas */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <AvatarCanvas
                isHoveringCTA={isHoveringCTA}
                className="w-full h-full"
              />
            </div>

            {/* Subtle label below avatar */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-mono text-[10px] text-slate-600 mt-2 tracking-widest select-none"
              aria-hidden="true"
            >
              3D · interactive
            </motion.p>
          </motion.div>

          {/* ── Mobile: compact avatar strip (sm–md only) ─────────────── */}
          {/* Shows a small 160px tall canvas above terminal on mobile */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex lg:hidden w-40 h-40 mx-auto relative -mb-4 order-first"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: "rgba(59,130,246,0.12)" }}
            />
            <AvatarCanvas
              isHoveringCTA={isHoveringCTA}
              className="w-full h-full"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
