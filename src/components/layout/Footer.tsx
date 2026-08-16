"use client";

import { motion } from "framer-motion";
import { Mail, Instagram, Phone, Zap, Heart } from "lucide-react";

const socialLinks = [
  {
    label: "Email",
    href: "mailto:aryattt45@gmail.com",
    icon: Mail,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6283890227712",
    icon: Phone,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/yaaprtm",
    icon: Instagram,
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-navy-900/50">
      {/* Gradient top line */}
      <div className="section-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap
                size={18}
                className="text-cyan-neon"
                style={{ filter: "drop-shadow(0 0 6px #00F0FF)" }}
              />
              <span className="font-mono font-bold text-cyan-neon tracking-wider text-sm">
                ARYAPTR_PORTO
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Arya Putra Pratama — Computer & Network Engineering Student, IT Support Technician, dan Android Developer Intern.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">
              // Navigasi
            </h3>
            <ul className="grid grid-cols-2 gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-cyan-neon text-sm transition-colors font-mono"
                  >
                    → {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">
              // Terhubung
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center
                               text-slate-500 hover:text-cyan-neon hover:border-cyan-neon/30 
                               hover:bg-cyan-soft transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs font-mono">
            © {new Date().getFullYear()} Arya Putra Pratama. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs font-mono flex items-center gap-1">
            Built with{" "}
            <Heart size={10} className="text-red-500 fill-red-500 mx-0.5" />
            using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
