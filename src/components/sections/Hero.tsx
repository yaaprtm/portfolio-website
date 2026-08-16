"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Instagram, Mail, Phone, ArrowUpRight } from "lucide-react";
import NetworkBackground from "@/components/ui/NetworkBackground";
import Button from "@/components/ui/Button";

const ROLES = [
  "STr. Teknik Rekayasa Internet Student @ PENS",
  "Computer & Network Engineer",
  "Android Developer (BRIN Intern)",
  "IT Support & Systems Technician",
  "MikroTik MTCNA Certified",
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

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

  return (
    <section
      id="home"
      className="relative min-h-screen pt-36 sm:pt-44 pb-24 flex items-center justify-center overflow-hidden"
    >
      <NetworkBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status badge — sleek & human-designed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full
                     border border-white/10 bg-white/[0.03] text-slate-300 text-xs font-mono backdrop-blur-xl shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
          <span>STr. Teknik Rekayasa Internet · PENS Surabaya</span>
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

        {/* Dynamic role headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="font-mono text-lg sm:text-2xl text-slate-300 font-medium">
            {displayText}
          </span>
          <span className="inline-block w-0.5 h-6 bg-cyan-neon ml-1 animate-pulse" />
        </motion.div>

        {/* Concise Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Spesialis Jaringan Komputer, IT Support, dan Android Developer. Berorientasi pada solusi infrastruktur digital yang efisien, andal, dan modern.
        </motion.p>

        {/* High Contrast CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Button variant="primary" size="lg" href="#projects">
            Lihat Proyek
            <ArrowUpRight size={18} className="ml-1" />
          </Button>
          <Button variant="secondary" size="lg" href="#contact">
            Hubungi Saya
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex items-center justify-center gap-3"
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
