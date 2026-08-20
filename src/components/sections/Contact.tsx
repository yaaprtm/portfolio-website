"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  Mail,
  Phone,
  MessageSquare,
  Linkedin,
  Github,
  Instagram,
  MapPin,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "arya2.pp@gmail.com",
    href: "mailto:arya2.pp@gmail.com",
    color: "text-red-400",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+62 819-0785-2222",
    href: "https://wa.me/6281907852222",
    color: "text-green-400",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/arya-pptr",
    href: "https://www.linkedin.com/in/arya-pptr/",
    color: "text-blue-400",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/yaaprtm",
    href: "https://github.com/yaaprtm",
    color: "text-slate-300",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@arya_pptr",
    href: "https://www.instagram.com/arya_pptr/",
    color: "text-pink-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Surabaya / Jakarta, Indonesia",
    href: null,
    color: "text-orange-400",
  },
];

export default function Contact() {
  const { t } = useLanguage();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError(t.contact.form.required);
      return;
    }

    setSending(true);
    await new Promise((res) => setTimeout(res, 1200));
    setSending(false);
    setSent(true);
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        tag={t.contact.tag}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ─── Contact Form ─── */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8"
        >
          <h3 className="font-semibold text-slate-200 text-base mb-6 flex items-center gap-2">
            <MessageSquare size={18} className="text-cyan-neon" />
            {t.contact.sendMessage}
          </h3>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <CheckCircle2 size={48} className="text-cyan-neon" />
              <h4 className="font-semibold text-slate-100 text-lg">{t.contact.form.successTitle}</h4>
              <p className="text-slate-400 text-sm">{t.contact.form.successDesc}</p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                className="text-xs font-mono text-cyan-neon hover:underline mt-2"
              >
                {t.contact.form.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-slate-300 text-xs font-mono mb-1.5">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.contact.form.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-100 text-sm font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-neon/40 focus:ring-1 focus:ring-cyan-neon/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-mono mb-1.5">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t.contact.form.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-100 text-sm font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-neon/40 focus:ring-1 focus:ring-cyan-neon/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-mono mb-1.5">
                  {t.contact.form.message}
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.contact.form.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-slate-100 text-sm font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-neon/40 focus:ring-1 focus:ring-cyan-neon/20 transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs font-mono">{error}</p>
              )}

              <Button type="submit" variant="primary" size="lg" disabled={sending} className="w-full">
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={16} className="animate-pulse" />
                    {t.contact.form.sending}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={16} />
                    {t.contact.form.submit}
                  </span>
                )}
              </Button>
            </form>
          )}
        </motion.div>

        {/* ─── Direct Contact Links ─── */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <h3 className="font-semibold text-slate-200 text-base mb-2">
              {t.contact.directContact}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t.contact.directContactDesc}
            </p>
          </div>

          <div className="space-y-3">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.label}
                  whileHover={{ x: 4 }}
                  className="glass-card px-5 py-4 flex items-center gap-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <Icon size={16} className={link.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-mono text-slate-400">{link.label}</p>
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-200 hover:text-cyan-neon transition-colors truncate block"
                      >
                        {link.value}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-200 truncate block">
                        {link.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
