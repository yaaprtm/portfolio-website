"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User, RefreshCw } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
}

const presetQuestions = [
  "Apa pengalaman Arya di BRIN?",
  "Berapa skor MikroTik Arya?",
  "Apa jurusan Arya di PENS?",
  "Bagaimana cara menghubungi Arya?",
];

const answersMap: Record<string, string> = {
  "Apa pengalaman Arya di BRIN?":
    "Saat magang 2 bulan di BRIN (Badan Riset dan Inovasi Nasional), Arya berperan sebagai Android Developer dalam tim 4 orang (1 FE, 2 BE, 1 Android). Arya mengembangkan aplikasi mobile Android untuk Kebun Raya Cibinong.",

  "Berapa skor MikroTik Arya?":
    "Arya memegang sertifikasi resmi MikroTik Certified Network Associate (MTCNA) yang diperoleh tahun 2024 dengan skor tinggi 88%!",

  "Apa jurusan Arya di PENS?":
    "Arya adalah Mahasiswa Baru program studi Sarjana Terapan (STr.) Teknik Rekayasa Internet di Politeknik Elektronika Negeri Surabaya (PENS) periode 2026 - 2030.",

  "Bagaimana cara menghubungi Arya?":
    "Anda bisa menghubungi Arya via Email (aryattt45@gmail.com) atau WhatsApp (+62 838-9022-7712), atau DM via Instagram (@yaaprtm).",
};

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Halo! Saya Arya AI Assistant 🤖. Ada yang ingin Anda tanyakan mengenai kualifikasi, pengalaman magang BRIN, atau pendidikan Arya?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = { id: Date.now(), sender: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      let aiResponse = answersMap[userText];
      if (!aiResponse) {
        // Fallback matching
        const lower = userText.toLowerCase();
        if (lower.includes("brin") || lower.includes("magang")) {
          aiResponse = answersMap["Apa pengalaman Arya di BRIN?"];
        } else if (lower.includes("mtcna") || lower.includes("mikrotik") || lower.includes("skor")) {
          aiResponse = answersMap["Berapa skor MikroTik Arya?"];
        } else if (lower.includes("pens") || lower.includes("kuliah") || lower.includes("jurusan")) {
          aiResponse = answersMap["Apa jurusan Arya di PENS?"];
        } else if (lower.includes("kontak") || lower.includes("email") || lower.includes("wa")) {
          aiResponse = answersMap["Bagaimana cara menghubungi Arya?"];
        } else {
          aiResponse =
            "Arya Putra Pratama adalah Mahasiswa STr. Teknik Rekayasa Internet PENS Surabaya, lulusan TKJ, bersertifikat MikroTik MTCNA (88%), dan berpengalaman IT Support serta Android Dev di BRIN.";
        }
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: "ai", text: aiResponse }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="btn-primary p-3.5 rounded-2xl flex items-center gap-2 shadow-2xl group border border-cyan-neon/40"
        >
          <Bot size={22} className="text-navy-950 group-hover:rotate-12 transition-transform" />
          <span className="font-mono text-xs font-bold text-navy-950 pr-1">Ask Arya AI</span>
          <Sparkles size={14} className="text-navy-950 animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 sm:w-96 glass-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[460px]"
          >
            {/* Header */}
            <div className="p-3.5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-soft border border-cyan-neon/30 flex items-center justify-center">
                  <Bot size={18} className="text-cyan-neon" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-xs flex items-center gap-1.5">
                    Ask Arya AI <span className="w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400">Interactive Career Assistant</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs leading-relaxed">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-6 h-6 rounded-lg bg-cyan-soft border border-cyan-neon/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={12} className="text-cyan-neon" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3 rounded-xl font-sans ${
                      msg.sender === "user"
                        ? "bg-cyan-neon text-navy-950 font-medium rounded-tr-none"
                        : "bg-white/[0.05] border border-white/10 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.sender === "user" && (
                    <div className="w-6 h-6 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={12} className="text-slate-300" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                  <RefreshCw size={12} className="animate-spin text-cyan-neon" />
                  <span>Arya AI sedang mengetik...</span>
                </div>
              )}
            </div>

            {/* Presets */}
            <div className="p-2 border-t border-white/5 bg-white/[0.02] flex gap-1.5 overflow-x-auto">
              {presetQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 hover:border-cyan-neon/40 text-[10px] font-mono text-slate-300 hover:text-cyan-neon transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-2.5 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan sesuatu..."
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none input-glow"
              />
              <button
                type="submit"
                className="btn-primary p-2 rounded-xl flex items-center justify-center"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
