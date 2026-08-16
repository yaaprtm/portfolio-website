"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ThemeMode = "lime" | "cyan" | "violet" | "monochrome";

interface ThemeOption {
  id: ThemeMode;
  name: string;
  color: string;
}

const themes: ThemeOption[] = [
  { id: "lime", name: "Obsidian Lime", color: "#D4FF00" },
  { id: "cyan", name: "Cyber Cyan", color: "#00F0FF" },
  { id: "violet", name: "Electric Violet", color: "#A855F7" },
  { id: "monochrome", name: "Studio Mono", color: "#FFFFFF" },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<ThemeMode>("lime");
  const [open, setOpen] = useState(false);

  const applyTheme = (mode: ThemeMode) => {
    setActiveTheme(mode);
    const root = document.documentElement;

    if (mode === "lime") {
      root.style.setProperty("--color-cyan", "#D4FF00");
      root.style.setProperty("--color-cyan-glow", "#E2F952");
      root.style.setProperty("--color-cyan-dim", "#88B000");
      root.style.setProperty("--color-cyan-soft", "rgba(212, 255, 0, 0.15)");
      root.style.setProperty("--color-border-hover", "rgba(212, 255, 0, 0.35)");
    } else if (mode === "cyan") {
      root.style.setProperty("--color-cyan", "#00F0FF");
      root.style.setProperty("--color-cyan-glow", "#38BDF8");
      root.style.setProperty("--color-cyan-dim", "#00A8B5");
      root.style.setProperty("--color-cyan-soft", "rgba(0, 240, 255, 0.15)");
      root.style.setProperty("--color-border-hover", "rgba(0, 240, 255, 0.35)");
    } else if (mode === "violet") {
      root.style.setProperty("--color-cyan", "#A855F7");
      root.style.setProperty("--color-cyan-glow", "#C084FC");
      root.style.setProperty("--color-cyan-dim", "#7E22CE");
      root.style.setProperty("--color-cyan-soft", "rgba(168, 85, 247, 0.15)");
      root.style.setProperty("--color-border-hover", "rgba(168, 85, 247, 0.35)");
    } else if (mode === "monochrome") {
      root.style.setProperty("--color-cyan", "#FFFFFF");
      root.style.setProperty("--color-cyan-glow", "#E2E8F0");
      root.style.setProperty("--color-cyan-dim", "#94A3B8");
      root.style.setProperty("--color-cyan-soft", "rgba(255, 255, 255, 0.15)");
      root.style.setProperty("--color-border-hover", "rgba(255, 255, 255, 0.4)");
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
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-2 mb-2">
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
