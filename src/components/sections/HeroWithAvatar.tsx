"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Instagram, Mail, Phone, ArrowUpRight } from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Button from "@/components/ui/Button";

// Lazy-load avatar — Three.js requires browser APIs, no SSR
const AvatarCanvas = dynamic(
  () => import("@/components/three/AvatarCanvas"),
  { ssr: false }
);

const ROLES = [
  "IT Enthusiast",
  "Network & Systems Explorer",
  "Android Developer",
  "IT Support Specialist",
];

export default function HeroWithAvatar() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const role = ROLES[currentRole];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < role.length) {
      timeout = setTimeout(() => {
        setDisplayText(role.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 75);
    } else if (!isDeleting && charIndex === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(role.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentRole((r) => (r + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentRole]);

  const handleCTAEnter = useCallback(() => setIsHoveringCTA(true), []);
  const handleCTALeave = useCallback(() => setIsHoveringCTA(false), []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-36 sm:pt-44 pb-24 flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Original dark background */}
      <NetworkBackground />

      {/* ── Desktop layout: text left (60%) + avatar right (40%) ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-0">

          {/* ── Text Content (always visible, left on desktop) ─────── */}
          <div className="w-full lg:flex-1 text-center lg:text-left">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full
                         border border-white/10 bg-white/[0.03] text-slate-300 text-xs font-mono backdrop-blur-xl shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
              <span>IT Enthusiast · PENS Surabaya</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-5 text-slate-100"
            >
              Arya Putra <span className="text-cyan-neon">Pratama</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="h-10 flex items-center justify-center lg:justify-start mb-6"
            >
              <span className="font-mono text-lg sm:text-2xl text-slate-300 font-medium">
                {displayText}
              </span>
              <span className="inline-block w-0.5 h-6 bg-cyan-neon ml-1 animate-pulse" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-normal"
            >
              IT Enthusiast yang antusias mengeksplorasi teknologi — dari jaringan komputer,
              pengembangan Android, hingga infrastruktur digital modern.
            </motion.p>

            {/* CTA Buttons — hover triggers avatar smile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14"
              onMouseEnter={handleCTAEnter}
              onMouseLeave={handleCTALeave}
            >
              <Button variant="primary" size="lg" href="#projects" id="hero-cta-projects">
                Lihat Proyek
                <ArrowUpRight size={18} className="ml-1" />
              </Button>
              <Button variant="secondary" size="lg" href="#contact" id="hero-cta-contact">
                Hubungi Saya
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              {[
                { icon: Mail, href: "mailto:aryattt45@gmail.com", label: "Email" },
                { icon: Phone, href: "https://wa.me/6283890227712", label: "WhatsApp" },
                { icon: Instagram, href: "https://instagram.com/yaaprtm", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center
                             text-slate-400 hover:text-cyan-neon hover:border-cyan-neon/40 hover:bg-cyan-soft
                             transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Avatar Column (desktop only — no card, no border) ─────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            className="hidden lg:block relative flex-shrink-0"
            style={{ width: "420px", height: "560px" }}
            aria-hidden="true"
          >
            {/* Glow halo behind avatar — matches site accent blue */}
            <div
              className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 70% at 55% 45%, rgba(59,130,246,0.15) 0%, transparent 75%)",
              }}
            />

            {/* Ground shadow / reflection glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 blur-2xl rounded-full pointer-events-none"
              style={{ background: "rgba(59,130,246,0.14)" }}
            />

            {/* Gradient fade on left edge so avatar blends into bg */}
            <div
              className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, var(--color-bg) 0%, transparent 100%)",
              }}
            />

            {/* Canvas — transparent bg, no border, no card */}
            <AvatarCanvas
              isHoveringCTA={isHoveringCTA}
              className="w-full h-full"
            />
          </motion.div>

          {/* ── Mobile: small avatar bubble above text ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex lg:hidden mx-auto mb-6 relative order-first"
            style={{ width: "160px", height: "200px" }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
              style={{ background: "rgba(59,130,246,0.14)" }}
            />
            <AvatarCanvas isHoveringCTA={isHoveringCTA} className="w-full h-full" />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-slate-500">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
