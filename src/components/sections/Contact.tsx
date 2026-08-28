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
import { useLanguage } from "@/context/LanguageContext";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "aryattt45@gmail.com",
    href: "mailto:aryattt45@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+62 838-9022-7712",
    href: "https://wa.me/6283890227712",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/arya-putra-pratama-848871338",
    href: "https://www.linkedin.com/in/arya-putra-pratama-848871338/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/yaaprtm",
    href: "https://github.com/yaaprtm",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@yaaprtm",
    href: "https://www.instagram.com/yaaprtm",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Surabaya / Jakarta, Indonesia",
    href: null,
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
    <SectionWrapper id="contact" className="bg-[#F0EEE9]">
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
          className="editorial-card p-8 sm:p-10"
        >
          <h3 className="font-display font-extrabold text-warm-dark text-xl mb-6 flex items-center gap-2">
            <MessageSquare size={20} className="text-olive-500" />
            {t.contact.sendMessage}
          </h3>

          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <CheckCircle2 size={52} className="text-olive-500" />
              <h4 className="font-display font-bold text-warm-dark text-xl">{t.contact.form.successTitle}</h4>
              <p className="text-warm-gray text-sm">{t.contact.form.successDesc}</p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                className="text-xs font-bold uppercase tracking-wider text-olive-500 hover:underline mt-2"
              >
                {t.contact.form.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-warm-dark text-xs font-bold uppercase tracking-wider mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.contact.form.namePlaceholder}
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 text-warm-dark text-sm font-medium placeholder-warm-muted focus:outline-none focus:border-olive-500 focus:ring-2 focus:ring-olive-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-warm-dark text-xs font-bold uppercase tracking-wider mb-2">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t.contact.form.emailPlaceholder}
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 text-warm-dark text-sm font-medium placeholder-warm-muted focus:outline-none focus:border-olive-500 focus:ring-2 focus:ring-olive-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-warm-dark text-xs font-bold uppercase tracking-wider mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.contact.form.messagePlaceholder}
                  className="w-full px-5 py-3.5 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 text-warm-dark text-sm font-medium placeholder-warm-muted focus:outline-none focus:border-olive-500 focus:ring-2 focus:ring-olive-500/20 transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-red-600 text-xs font-bold">{error}</p>
              )}

              <button type="submit" disabled={sending} className="btn-primary w-full py-4 text-sm uppercase tracking-wider">
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
              </button>
            </form>
          )}
        </motion.div>

        {/* ─── Direct Contact Links ─── */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-display font-extrabold text-warm-dark text-2xl mb-3">
              {t.contact.directContact}
            </h3>
            <p className="text-warm-gray text-base leading-relaxed mb-6">
              {t.contact.directContactDesc}
            </p>
          </div>

          <div className="space-y-3.5">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.label}
                  whileHover={{ x: 4 }}
                  className="editorial-card px-6 py-4 flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-olive-500/10 border border-olive-500/20 flex items-center justify-center text-olive-500 flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-warm-muted">{link.label}</p>
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-warm-dark hover:text-olive-500 transition-colors truncate block"
                      >
                        {link.value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-warm-dark truncate block">
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
