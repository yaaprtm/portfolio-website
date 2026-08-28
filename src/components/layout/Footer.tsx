"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Instagram, Linkedin, Phone, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  { label: "Email", href: "mailto:aryattt45@gmail.com", icon: Mail },
  { label: "WhatsApp", href: "https://wa.me/6283890227712", icon: Phone },
  { label: "Instagram", href: "https://www.instagram.com/yaaprtm", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arya-putra-pratama-848871338/", icon: Linkedin },
];

const navKeys = [
  { key: "home", href: "/#home" },
  { key: "about", href: "/#about" },
  { key: "skills", href: "/#skills" },
  { key: "projects", href: "/#projects" },
  { key: "experience", href: "/#experience" },
  { key: "certifications", href: "/#certifications" },
  { key: "contact", href: "/#contact" },
] as const;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-warm-dark/10 bg-[#E8E4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <span className="font-display font-extrabold text-warm-dark uppercase tracking-tight text-xl mb-3 block">
              Arya Putra Pratama
            </span>
            <p className="text-warm-gray text-xs leading-relaxed max-w-sm font-medium">
              {t.footer.desc}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-olive-500 mb-4">
              {t.footer.navigation}
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {navKeys.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-gray hover:text-warm-dark text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/notes"
                  className="text-warm-gray hover:text-warm-dark text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Catatan Teknis
                </Link>
              </li>
              <li>
                <Link
                  href="/print"
                  className="text-olive-500 hover:underline text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  📄 {t.common.printPortfolio}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-olive-500 mb-4">
              {t.footer.social}
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
                    className="w-10 h-10 rounded-full bg-[#F0EEE9] border border-warm-dark/10 flex items-center justify-center
                               text-warm-dark hover:bg-olive-500 hover:text-white hover:border-olive-500 transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-warm-dark/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray text-xs font-semibold uppercase tracking-wider">
            © {new Date().getFullYear()} Arya Putra Pratama. {t.footer.copyright}
          </p>
          <p className="text-warm-gray text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
            {t.footer.builtWith}{" "}
            <Heart size={12} className="text-olive-500 fill-olive-500 mx-0.5" />
            using Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
