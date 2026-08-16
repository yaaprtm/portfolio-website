"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Instagram,
  MessageCircle,
  Send,
  User,
  AtSign,
  MessageSquare,
  CheckCircle,
  Phone,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import NetworkBackground from "@/components/ui/NetworkBackground";

const socialLinks = [
  {
    label: "Email",
    href: "mailto:aryattt45@gmail.com",
    icon: Mail,
    value: "aryattt45@gmail.com",
    color: "#00F0FF",
  },
  {
    label: "WhatsApp / Phone",
    href: "https://wa.me/6283890227712",
    icon: Phone,
    value: "+62 838-9022-7712",
    color: "#25D366",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/yaaprtm",
    icon: Instagram,
    value: "@yaaprtm",
    color: "#E4405F",
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
      setError("Semua field harus diisi.");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1800));
    setLoading(false);
    setSent(true);
  };

  return (
    <SectionWrapper id="contact" className="relative">
      {/* Subtle network background */}
      <div className="absolute inset-0 overflow-hidden">
        <NetworkBackground nodeCount={30} maxDistance={100} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-transparent to-navy-950/80" />
      </div>

      <div className="relative z-10">
        <SectionHeading
          tag="06. Contact"
          title="Hubungi Saya"
          subtitle="Tertarik untuk bekerja sama, diskusi proyek, atau tawaran posisi IT? Mari terhubung!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 sm:p-8"
          >
            <h3 className="font-mono font-bold text-slate-200 mb-6 flex items-center gap-2">
              <span className="text-cyan-neon/50">$</span>
              send_message.sh
            </h3>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <p className="font-mono text-green-400 font-medium">
                  Pesan terkirim!
                </p>
                <p className="text-slate-500 text-sm">
                  Terima kasih Arya akan membalas pesan Anda sesegera mungkin.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-2 text-xs font-mono text-slate-600 hover:text-slate-400 transition-colors underline"
                >
                  Kirim pesan lain
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <label className="block text-xs font-mono text-slate-500 mb-1.5">
                    // Nama Lengkap
                  </label>
                  <div className="relative">
                    <User
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                    />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nama Anda"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5
                                 text-sm text-slate-300 placeholder-slate-700 font-mono input-glow
                                 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5">
                    // Email
                  </label>
                  <div className="relative">
                    <AtSign
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                    />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5
                                 text-sm text-slate-300 placeholder-slate-700 font-mono input-glow
                                 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1.5">
                    // Pesan
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={14}
                      className="absolute left-3 top-3 text-slate-600"
                    />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Ceritakan tentang proyek atau tawaran kerja..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5
                                 text-sm text-slate-300 placeholder-slate-700 font-mono input-glow
                                 transition-all resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-xs font-mono">{error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 rounded-lg flex items-center justify-center gap-2
                             font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cyan-neon/40 border-t-cyan-neon rounded-full animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info & social links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <p className="font-mono text-xs text-cyan-neon/50 mb-2">$ ping --arya</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Anda dapat menghubungi Arya Putra Pratama secara langsung melalui email, WhatsApp, maupun media sosial di bawah ini.
              </p>
            </div>

            {/* Social links */}
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
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 glass-card p-4 group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all"
                      style={{
                        background: `${social.color}12`,
                        borderColor: `${social.color}25`,
                      }}
                    >
                      <Icon size={18} style={{ color: social.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono text-slate-500 mb-0.5">
                        {social.label}
                      </div>
                      <div className="text-sm font-mono text-slate-300 group-hover:text-slate-100 transition-colors truncate">
                        {social.value}
                      </div>
                    </div>
                    <div className="ml-auto text-slate-700 group-hover:translate-x-1 transition-transform">
                      →
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
