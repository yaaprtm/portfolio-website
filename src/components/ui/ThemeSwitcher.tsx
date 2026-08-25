"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export type ThemeMode = "mono" | "blue" | "teal" | "indigo";

interface ThemeOption {
  id: ThemeMode;
  name: string;
  color: string;
  // Dark mode bg/surface
  darkBg: string;
  darkSurface: string;
  darkSurface2: string;
  // Accent colors (applied in both modes)
  cyan: string;
  cyanText: string;
  cyanGlow: string;
  cyanDim: string;
  cyanSoft: string;
  borderHover: string;
  // Light mode accent (slightly darker for readability)
  lightCyan: string;
  lightCyanText: string;
  lightCyanGlow: string;
  lightCyanDim: string;
  lightCyanSoft: string;
}

const themes: ThemeOption[] = [
  {
    id: "mono",
    name: "Noir (Hitam & Putih)",
    color: "#FFFFFF",
    darkBg: "#050505",
    darkSurface: "#0a0a0a",
    darkSurface2: "#141414",
    cyan: "#ffffff",
    cyanText: "#050505",
    cyanGlow: "#ffffff",
    cyanDim: "#a1a1aa",
    cyanSoft: "rgba(255, 255, 255, 0.14)",
    borderHover: "rgba(255, 255, 255, 0.4)",
    lightCyan: "#09090b",
    lightCyanText: "#ffffff",
    lightCyanGlow: "#18181b",
    lightCyanDim: "#27272a",
    lightCyanSoft: "rgba(9, 9, 11, 0.10)",
  },
  {
    id: "blue",
    name: "Electric Blue",
    color: "#3B82F6",
    darkBg: "#0b1120",
    darkSurface: "#0f172a",
    darkSurface2: "#1e293b",
    cyan: "#3b82f6",
    cyanText: "#ffffff",
    cyanGlow: "#60a5fa",
    cyanDim: "#2563eb",
    cyanSoft: "rgba(59, 130, 246, 0.16)",
    borderHover: "rgba(59, 130, 246, 0.4)",
    lightCyan: "#2563eb",
    lightCyanText: "#ffffff",
    lightCyanGlow: "#3b82f6",
    lightCyanDim: "#1d4ed8",
    lightCyanSoft: "rgba(37, 99, 235, 0.12)",
  },
  {
    id: "teal",
    name: "Emerald Teal",
    color: "#10B981",
    darkBg: "#061A14",
    darkSurface: "#0B2920",
    darkSurface2: "#133D30",
    cyan: "#10B981",
    cyanText: "#061A14",
    cyanGlow: "#34D399",
    cyanDim: "#059669",
    cyanSoft: "rgba(16, 185, 129, 0.16)",
    borderHover: "rgba(16, 185, 129, 0.4)",
    lightCyan: "#059669",
    lightCyanText: "#ffffff",
    lightCyanGlow: "#10B981",
    lightCyanDim: "#047857",
    lightCyanSoft: "rgba(5, 150, 105, 0.12)",
  },
  {
    id: "indigo",
    name: "Indigo Violet",
    color: "#6366F1",
    darkBg: "#0E0D22",
    darkSurface: "#161536",
    darkSurface2: "#211F4E",
    cyan: "#6366F1",
    cyanText: "#ffffff",
    cyanGlow: "#818CF8",
    cyanDim: "#4F46E5",
    cyanSoft: "rgba(99, 102, 241, 0.16)",
    borderHover: "rgba(99, 102, 241, 0.4)",
    lightCyan: "#4F46E5",
    lightCyanText: "#ffffff",
    lightCyanGlow: "#6366F1",
    lightCyanDim: "#4338CA",
    lightCyanSoft: "rgba(79, 70, 229, 0.12)",
  },
];

export default function ThemeSwitcher() {
  const { t } = useLanguage();
  const [activeTheme, setActiveTheme] = useState<ThemeMode>("mono");
  const [open, setOpen] = useState(false);

  const applyTheme = (mode: ThemeMode) => {
    setActiveTheme(mode);
    const root = document.documentElement;
    const isLight = root.classList.contains("light");
    const theme = themes.find((t) => t.id === mode)!;

    // Always set accent colors (mode-aware)
    root.style.setProperty("--color-cyan", isLight ? theme.lightCyan : theme.cyan);
    root.style.setProperty("--color-cyan-text", isLight ? theme.lightCyanText : theme.cyanText);
    root.style.setProperty("--color-cyan-glow", isLight ? theme.lightCyanGlow : theme.cyanGlow);
    root.style.setProperty("--color-cyan-dim", isLight ? theme.lightCyanDim : theme.cyanDim);
    root.style.setProperty("--color-cyan-soft", isLight ? theme.lightCyanSoft : theme.cyanSoft);
    root.style.setProperty("--color-border-hover", isLight ? `rgba(${hexToRgb(theme.lightCyan)}, 0.4)` : theme.borderHover);

    // Override bg/surface in dark mode
    if (!isLight) {
      root.style.setProperty("--color-bg", theme.darkBg);
      root.style.setProperty("--color-surface", theme.darkSurface);
      root.style.setProperty("--color-surface-2", theme.darkSurface2);
    }

    try {
      localStorage.setItem("portfolio-color-theme", mode);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-color-theme") as ThemeMode;
      if (saved && themes.some((t) => t.id === saved)) {
        applyTheme(saved);
      } else {
        applyTheme("mono");
      }
    } catch {
      applyTheme("mono");
    }
  }, []);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center
                   text-slate-400 hover:text-cyan-neon hover:border-cyan-neon/30 transition-all"
        title={t.common.switchTheme}
        aria-label={t.common.switchTheme}
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
              className="absolute right-0 top-12 w-52 rounded-2xl glass-card p-3 border border-white/10 shadow-2xl z-50"
            >
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-2 mb-2">
                {t.common.switchTheme}
              </p>
              <div className="space-y-1">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      applyTheme(theme.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-mono transition-all text-left ${
                      activeTheme === theme.id
                        ? "bg-white/10 text-white font-semibold"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0"
                      style={{ background: theme.color }}
                    />
                    {theme.name}
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

/** Utility: Convert hex to "r, g, b" string for rgba() use */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0, 0, 0";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
