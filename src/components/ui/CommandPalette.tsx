"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, Phone, Mail, User, Briefcase, Award, Code, FolderGit2, Home, ExternalLink } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCv: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenCv }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    { label: "Buka CV (Live Preview)", icon: FileText, action: () => { onClose(); onOpenCv(); } },
    { label: "Navigasi: Home", icon: Home, href: "#home" },
    { label: "Navigasi: About Me", icon: User, href: "#about" },
    { label: "Navigasi: Skills", icon: Code, href: "#skills" },
    { label: "Navigasi: Projects", icon: FolderGit2, href: "#projects" },
    { label: "Navigasi: Experience", icon: Briefcase, href: "#experience" },
    { label: "Navigasi: Certifications", icon: Award, href: "#certifications" },
    { label: "Hubungi via WhatsApp", icon: Phone, action: () => { window.open("https://wa.me/6283890227712", "_blank"); } },
    { label: "Kirim Email", icon: Mail, action: () => { window.location.href = "mailto:aryattt45@gmail.com"; } },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: (typeof items)[0]) => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      onClose();
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative w-full max-w-xl glass-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik perintah atau cari (contoh: CV, Proyek, WhatsApp)..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
                autoFocus
              />
              <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-400 border border-white/10">
                ESC
              </kbd>
            </div>

            {/* List */}
            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-4 text-center text-xs font-mono text-slate-500">
                  Tidak ada perintah yang cocok.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} className="text-cyan-neon" />
                        <span>{item.label}</span>
                      </div>
                      <ExternalLink size={12} className="text-slate-600 group-hover:text-slate-300 transition-colors" />
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
