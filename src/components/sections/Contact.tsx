"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Instagram,
  Linkedin,
  Send,
  User,
  AtSign,
  MessageSquare,
  CheckCircle,
  Phone,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

const socialLinks = [
  {
    label: "Email Direct",
    href: "mailto:aryattt45@gmail.com",
    icon: Mail,
    value: "aryattt45@gmail.com",
  },
  {
    label: "WhatsApp / Call",
    href: "https://wa.me/6283890227712",
    icon: Phone,
    value: "+62 838-9022-7712",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yaaprtm",
    icon: Instagram,
    value: "@yaaprtm",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arya-putra-pratama-848871338/",
    icon: Linkedin,
    value: "Arya Putra Pratama",
  },
];

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Semua kolom harus diisi.");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1800));
    setLoading(false);
    setSent(true);
  };

  return (
    <SectionWrapper id="contact" className="relative">
      <div className="relative z-10">
        <SectionHeading
          tag="06 / CONTACT"
          title="Mari Terhubung"
          subtitle="Terbuka untuk diskusi proyek, peluang kolaborasi, maupun penawaran karir IT."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 sm:p-8"
          >
            <h3 className="font-bold text-slate-100 text-lg mb-6">
              Kirim Pesan
            </h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-10 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-cyan-soft border border-cyan-neon/30 flex items-center justify-center">
                  <CheckCircle size={28} className="text-cyan-neon" />
                </div>
                <p className="font-semibold text-slate-100 text-base">
                  Pesan Terkirim!
                </p>
                <p className="text-slate-400 text-xs sm:text-sm max-w-xs">
                  Terima kasih, Arya akan segera merespons pesan Anda.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-2 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors underline"
                >
                  Kirim pesan lain
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3
                                 text-sm text-slate-200 placeholder-slate-600 input-glow transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <AtSign
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3
                                 text-sm text-slate-200 placeholder-slate-600 input-glow transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Pesan Anda
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={16}
                      className="absolute left-3.5 top-3.5 text-slate-500"
                    />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tuliskan detail pesan Anda..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3
                                 text-sm text-slate-200 placeholder-slate-600 input-glow transition-all resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-mono">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2
                             text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-navy-950/40 border-t-navy-950 rounded-full animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <div>
              <h4 className="font-bold text-slate-100 text-lg mb-2">Kontak Langsung</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Anda juga dapat menghubungi Arya Putra Pratama melalui saluran komunikasi resmi berikut:
              </p>
            </div>

            <div className="space-y-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 glass-card p-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-neon/40 transition-colors">
                      <Icon size={18} className="text-cyan-neon" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">
                        {social.label}
                      </div>
                      <div className="text-sm font-mono text-slate-200 group-hover:text-cyan-neon transition-colors truncate">
                        {social.value}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
