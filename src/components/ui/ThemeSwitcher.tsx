"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ThemeMode = "blue" | "teal" | "indigo" | "mono";

interface ThemeOption {
  id: ThemeMode;
  name: string;
  color: string;
}

const themes: ThemeOption[] = [
  { id: "blue", name: "Electric Blue", color: "#3B82F6" },
  { id: "teal", name: "Emerald Teal", color: "#10B981" },
  { id: "indigo", name: "Indigo Violet", color: "#6366F1" },
  { id: "mono", name: "Slate Mono", color: "#94A3B8" },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<ThemeMode>("blue");
  const [open, setOpen] = useState(false);

  const applyTheme = (mode: ThemeMode) => {
    setActiveTheme(mode);
    const root = document.documentElement;

    if (mode === "blue") {
      root.style.setProperty("--color-bg", "#0b1120");
      root.style.setProperty("--color-surface", "#0f172a");
      root.style.setProperty("--color-surface-2", "#1e293b");
      root.style.setProperty("--color-cyan", "#3b82f6");
      root.style.setProperty("--color-cyan-glow", "#60a5fa");
      root.style.setProperty("--color-cyan-dim", "#2563eb");
      root.style.setProperty("--color-cyan-soft", "rgba(59, 130, 246, 0.16)");
      root.style.setProperty("--color-border-hover", "rgba(59, 130, 246, 0.4)");
    } else if (mode === "teal") {
      root.style.setProperty("--color-bg", "#061A14");
      root.style.setProperty("--color-surface", "#0B2920");
      root.style.setProperty("--color-surface-2", "#133D30");
      root.style.setProperty("--color-cyan", "#10B981");
      root.style.setProperty("--color-cyan-glow", "#34D399");
      root.style.setProperty("--color-cyan-dim", "#059669");
      root.style.setProperty("--color-cyan-soft", "rgba(16, 185, 129, 0.16)");
      root.style.setProperty("--color-border-hover", "rgba(16, 185, 129, 0.4)");
    } else if (mode === "indigo") {
      root.style.setProperty("--color-bg", "#0E0D22");
      root.style.setProperty("--color-surface", "#161536");
      root.style.setProperty("--color-surface-2", "#211F4E");
      root.style.setProperty("--color-cyan", "#6366F1");
      root.style.setProperty("--color-cyan-glow", "#818CF8");
      root.style.setProperty("--color-cyan-dim", "#4F46E5");
      root.style.setProperty("--color-cyan-soft", "rgba(99, 102, 241, 0.16)");
      root.style.setProperty("--color-border-hover", "rgba(99, 102, 241, 0.4)");
    } else if (mode === "mono") {
      root.style.setProperty("--color-bg", "#0F172A");
      root.style.setProperty("--color-surface", "#1E293B");
      root.style.setProperty("--color-surface-2", "#334155");
      root.style.setProperty("--color-cyan", "#F1F5F9");
      root.style.setProperty("--color-cyan-glow", "#FFFFFF");
      root.style.setProperty("--color-cyan-dim", "#94A3B8");
      root.style.setProperty("--color-cyan-soft", "rgba(241, 245, 249, 0.16)");
      root.style.setProperty("--color-border-hover", "rgba(241, 245, 249, 0.4)");
    }
  };

  return (
    <div className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center
                   text-slate-400 hover:text-cyan-neon hover:border-cyan-neon/30 transition-all"
        title="Ubah Tema Warna"
      >
        <Palette size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute right-0 top-12 w-48 rounded-2xl glass-card p-3 border border-white/10 shadow-2xl z-50"
            >
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-2 mb-2">
                Pilih Suasana Warna
              </p>
              <div className="space-y-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      applyTheme(t.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-mono transition-all text-left ${
                      activeTheme === t.id
                        ? "bg-white/10 text-white font-semibold"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0"
                      style={{ background: t.color }}
                    />
                    {t.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
