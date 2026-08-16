"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Instagram, Mail, Phone } from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Button from "@/components/ui/Button";

// Roles for the typing / cycling animation based on Arya's updated profile
const ROLES = [
  "Teknik Rekayasa Internet Student @ PENS",
  "Computer & Network Engineer",
  "Android Developer (BRIN Intern)",
  "IT Support Technician",
  "MikroTik MTCNA Certified",
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  /**
   * Typing effect
   */
  useEffect(() => {
    const role = ROLES[currentRole];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < role.length) {
      timeout = setTimeout(() => {
        setDisplayText(role.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!isDeleting && charIndex === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(role.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentRole((r) => (r + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentRole]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated network background canvas */}
      <NetworkBackground nodeCount={80} maxDistance={150} />

      {/* Radial glow overlays */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

      {/* Dark vignette on edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(2, 11, 24, 0.7) 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full
                     border border-cyan-neon/20 bg-cyan-soft text-cyan-neon text-xs font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
          Mahasiswa STr. Teknik Rekayasa Internet — PENS Surabaya
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="font-mono text-slate-500 text-sm mb-3 tracking-widest"
        >
          $ whoami
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold font-mono tracking-tight mb-4"
        >
          <span className="text-slate-100">ARYA PUTRA</span>{" "}
          <span className="gradient-text">PRATAMA</span>
        </motion.h1>

        {/* Typing role indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="font-mono text-lg sm:text-2xl text-cyan-neon">
            {displayText}
          </span>
          <span className="inline-block w-0.5 h-6 bg-cyan-neon ml-1 animate-blink" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Mahasiswa Baru PENS Surabaya prodi STr. Teknik Rekayasa Internet dengan pengalaman praktis di IT Support, 
          maintenance jaringan, dan Android Development (Magang BRIN). Adaptif, cepat belajar, 
          dan berorientasi pada kerja tim.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button variant="primary" size="lg" href="#projects">
            Lihat Proyek Saya
            <span className="text-cyan-neon/60">→</span>
          </Button>
          <Button variant="secondary" size="lg" href="#contact">
            Hubungi Saya
          </Button>
        </motion.div>

        {/* Social quick-links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex items-center justify-center gap-4"
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
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center
                         text-slate-500 hover:text-cyan-neon hover:border-cyan-neon/30 hover:bg-cyan-soft
                         transition-all duration-200"
              aria-label={label}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-slate-600">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
