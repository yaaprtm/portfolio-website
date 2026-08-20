"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Laptop, Server, Play, RotateCcw, Wifi } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/** DORA directions: toServer = client→server, toClient = server→client */
const STEP_DIRECTIONS = ["toServer", "toClient", "toServer", "toClient"] as const;

const STEP_DURATION_MS = 1300;
const STEP_PAUSE_MS = 700;
const PACKET_SIZE = 30; // px

type Phase = "idle" | "running" | "complete";

export default function DhcpExplainer() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentStep, setCurrentStep] = useState(-1);
  const [wireWidth, setWireWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const wireRef = useRef<HTMLDivElement>(null);
  const hasAutoStarted = useRef(false);

  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  // Measure wire width on mount & resize
  useEffect(() => {
    const measure = () => {
      if (wireRef.current) {
        setWireWidth(wireRef.current.getBoundingClientRect().width);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Re-measure after phase changes (layout may shift)
  useEffect(() => {
    if (wireRef.current) {
      setWireWidth(wireRef.current.getBoundingClientRect().width);
    }
  }, [phase]);

  // Auto-start when scrolled into view
  useEffect(() => {
    if (isInView && phase === "idle" && !hasAutoStarted.current) {
      hasAutoStarted.current = true;
      const timer = setTimeout(() => {
        setPhase("running");
        setCurrentStep(0);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isInView, phase]);

  // Step auto-progression
  useEffect(() => {
    if (phase !== "running" || currentStep < 0) return;

    const timer = setTimeout(() => {
      if (currentStep >= 3) {
        setPhase("complete");
      } else {
        setCurrentStep((s) => s + 1);
      }
    }, STEP_DURATION_MS + STEP_PAUSE_MS);

    return () => clearTimeout(timer);
  }, [currentStep, phase]);

  const startAnimation = () => {
    setCurrentStep(0);
    setPhase("running");
  };

  const replay = () => {
    setPhase("idle");
    setCurrentStep(-1);
    hasAutoStarted.current = false;
    setTimeout(() => {
      setPhase("running");
      setCurrentStep(0);
    }, 150);
  };

  const steps = t.dhcp.steps;
  const stepDir =
    currentStep >= 0 && currentStep <= 3
      ? STEP_DIRECTIONS[currentStep]
      : null;
  const isToServer = stepDir === "toServer";

  // Packet travel x positions
  const packetStartX = isToServer ? 0 : wireWidth - PACKET_SIZE;
  const packetEndX = isToServer ? wireWidth - PACKET_SIZE : 0;

  // Active node highlights
  const clientActive =
    phase === "running" &&
    currentStep >= 0 &&
    (STEP_DIRECTIONS[currentStep] === "toServer" ||
      (currentStep > 0 && STEP_DIRECTIONS[currentStep - 1] === "toClient"));

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="md:col-span-2 glass-card p-6 flex flex-col gap-4 skill-card border border-white/10"
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-soft border border-cyan-neon/30 flex items-center justify-center flex-shrink-0">
            <Wifi size={18} className="text-cyan-neon" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 leading-tight">
              {t.dhcp.title}
            </h3>
            <p className="text-[11px] font-mono text-slate-500 mt-0.5">
              {t.dhcp.subtitle}
            </p>
          </div>
        </div>

        {/* Step progress dots */}
        <div className="flex items-center gap-2 self-center">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  scale:
                    i === currentStep && phase === "running" ? 1.4 : 1,
                  backgroundColor:
                    i < currentStep || phase === "complete"
                      ? "var(--color-cyan)"
                      : i === currentStep && phase === "running"
                      ? "var(--color-cyan)"
                      : "rgba(255,255,255,0.15)",
                  boxShadow:
                    i === currentStep && phase === "running"
                      ? "0 0 10px var(--color-cyan-soft)"
                      : "none",
                }}
                className="w-2.5 h-2.5 rounded-full transition-colors"
              />
              <span className="text-[8px] font-mono text-slate-600 leading-none">
                {step.label.slice(0, 3)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Diagram ── */}
      <div className="flex items-center gap-4">
        {/* Client */}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <motion.div
            animate={{
              borderColor:
                phase === "running" &&
                currentStep >= 0 &&
                (stepDir === "toServer" ||
                  (currentStep > 0 && STEP_DIRECTIONS[currentStep - 1] === "toClient"))
                  ? "var(--color-cyan)"
                  : "rgba(59,130,246,0.3)",
              boxShadow:
                phase === "running" &&
                currentStep >= 0 &&
                (stepDir === "toServer" ||
                  (currentStep > 0 && STEP_DIRECTIONS[currentStep - 1] === "toClient"))
                  ? "0 0 16px var(--color-cyan-soft)"
                  : "none",
            }}
            transition={{ duration: 0.3 }}
            className="w-11 h-11 rounded-xl bg-cyan-soft border-2 flex items-center justify-center"
          >
            <Laptop size={20} className="text-cyan-neon" />
          </motion.div>
          <span className="text-[10px] font-mono text-slate-400">
            {t.dhcp.client}
          </span>
        </div>

        {/* Wire + animated packet */}
        <div
          ref={wireRef}
          className="flex-1 relative h-11 flex items-center min-w-0"
        >
          {/* Static wire line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-px h-px bg-gradient-to-r from-cyan-neon/20 via-cyan-neon/40 to-cyan-neon/20" />

          {/* Animated packet */}
          <AnimatePresence>
            {phase === "running" && currentStep >= 0 && currentStep <= 3 && wireWidth > 0 && (
              <motion.div
                key={`pkt-${currentStep}`}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ width: PACKET_SIZE, height: PACKET_SIZE }}
                initial={{ x: packetStartX, opacity: 1 }}
                animate={{ x: packetEndX, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  x: { duration: STEP_DURATION_MS / 1000, ease: "easeInOut" },
                  opacity: { duration: 0.2 },
                }}
              >
                <div
                  className="w-full h-full rounded-lg bg-cyan-neon flex items-center justify-center shadow-lg"
                  style={{ boxShadow: "0 0 14px var(--color-cyan-soft)" }}
                >
                  <span className="text-[7px] font-mono font-black text-navy-950 leading-none tracking-tight">
                    {steps[currentStep]?.label.slice(0, 3).toUpperCase()}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Complete indicator */}
          {phase === "complete" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center"
            >
              <span className="px-2.5 py-1 rounded-md bg-cyan-soft border border-cyan-neon/30 text-[10px] font-mono font-bold text-cyan-neon">
                ✓ IP Assigned
              </span>
            </motion.div>
          )}
        </div>

        {/* DHCP Server */}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <motion.div
            animate={{
              borderColor:
                phase === "running" &&
                currentStep >= 0 &&
                (stepDir === "toClient" ||
                  (currentStep > 0 && STEP_DIRECTIONS[currentStep - 1] === "toServer"))
                  ? "rgba(59,130,246,0.7)"
                  : "rgba(255,255,255,0.1)",
              boxShadow:
                phase === "running" &&
                currentStep >= 0 &&
                (stepDir === "toClient" ||
                  (currentStep > 0 && STEP_DIRECTIONS[currentStep - 1] === "toServer"))
                  ? "0 0 16px var(--color-cyan-soft)"
                  : "none",
            }}
            transition={{ duration: 0.3 }}
            className="w-11 h-11 rounded-xl bg-white/[0.04] border-2 flex items-center justify-center"
          >
            <Server size={20} className="text-slate-400" />
          </motion.div>
          <span className="text-[10px] font-mono text-slate-400 text-center leading-tight">
            {t.dhcp.server}
          </span>
        </div>
      </div>

      {/* ── Step description / Controls ── */}
      <div className="min-h-[68px]">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <button
                onClick={startAnimation}
                className="btn-primary w-full py-2.5 rounded-xl text-xs font-mono flex items-center justify-center gap-2"
              >
                <Play size={13} />
                {t.dhcp.start}
              </button>
            </motion.div>
          )}

          {phase === "running" && currentStep >= 0 && (
            <motion.div
              key={`step-desc-${currentStep}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/10"
            >
              <p className="text-[11px] font-mono font-bold text-cyan-neon mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-cyan-soft border border-cyan-neon/40 flex items-center justify-center text-[8px]">
                  {currentStep + 1}
                </span>
                {steps[currentStep]?.label}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {steps[currentStep]?.desc}
              </p>
            </motion.div>
          )}

          {phase === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2.5"
            >
              <div className="p-3 rounded-xl bg-cyan-soft border border-cyan-neon/20">
                <p className="text-xs font-mono font-semibold text-cyan-neon">
                  ✓ {t.dhcp.complete}
                </p>
              </div>
              <button
                onClick={replay}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-200 transition-colors self-start"
              >
                <RotateCcw size={12} />
                {t.dhcp.replay}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
