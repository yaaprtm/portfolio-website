"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Instagram, Linkedin, Phone, Heart } from "lucide-react";

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
    href: "https://www.instagram.com/yaaprtm",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arya-putra-pratama-848871338/",
    icon: Linkedin,
  },
];

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Catatan Teknis", href: "/notes" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-navy-950/80">
      <div className="section-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <span className="font-bold text-slate-100 tracking-wider text-base mb-2 block">
              Arya Putra Pratama
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              IT Enthusiast, Mahasiswa STr. Teknik Rekayasa Internet (PENS Surabaya), IT Support Technician, dan Android Developer Intern.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">
              Navigasi
            </h3>
            <ul className="grid grid-cols-2 gap-1.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-neon text-xs transition-colors font-mono"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">
              Media Sosial
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
                    whileHover={{ y: -2 }}
                    className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center
                               text-slate-400 hover:text-cyan-neon hover:border-cyan-neon/30 
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

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs font-mono">
            © {new Date().getFullYear()} Arya Putra Pratama. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs font-mono flex items-center gap-1">
            Built with{" "}
            <Heart size={10} className="text-red-400 fill-red-400 mx-0.5" />
            using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
