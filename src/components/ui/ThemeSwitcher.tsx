"use client";

import { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export type EditorialColorTheme = "olive" | "terracotta" | "sage" | "espresso" | "burgundy" | "navy";

export interface ColorPreset {
  id: EditorialColorTheme;
  name: string;
  color: string;
  hoverColor: string;
  softColor: string;
}

export const colorPresets: ColorPreset[] = [
  {
    id: "olive",
    name: "Olive Green",
    color: "#6B7355",
    hoverColor: "#555D42",
    softColor: "rgba(107, 115, 85, 0.15)",
  },
  {
    id: "terracotta",
    name: "Terracotta Rust",
    color: "#B85B35",
    hoverColor: "#9B4A28",
    softColor: "rgba(184, 91, 53, 0.15)",
  },
  {
    id: "sage",
    name: "Forest Sage",
    color: "#4A6B5D",
    hoverColor: "#3A564A",
    softColor: "rgba(74, 107, 93, 0.15)",
  },
  {
    id: "espresso",
    name: "Espresso Noir",
    color: "#2C2825",
    hoverColor: "#1F1C1A",
    softColor: "rgba(44, 40, 37, 0.15)",
  },
  {
    id: "burgundy",
    name: "Warm Burgundy",
    color: "#8B3A42",
    hoverColor: "#722E35",
    softColor: "rgba(139, 58, 66, 0.15)",
  },
  {
    id: "navy",
    name: "Editorial Navy",
    color: "#2B4C7E",
    hoverColor: "#1F385C",
    softColor: "rgba(43, 76, 126, 0.15)",
  },
];

export default function ThemeSwitcher() {
  const { t } = useLanguage();
  const [activeTheme, setActiveTheme] = useState<EditorialColorTheme>("olive");
  const [open, setOpen] = useState(false);

  const applyTheme = (presetId: EditorialColorTheme) => {
    setActiveTheme(presetId);
    const preset = colorPresets.find((p) => p.id === presetId) || colorPresets[0];
    const root = document.documentElement;

    root.style.setProperty("--color-olive", preset.color);
    root.style.setProperty("--color-olive-hover", preset.hoverColor);
    root.style.setProperty("--color-olive-soft", preset.softColor);

    try {
      localStorage.setItem("portfolio-color-theme", presetId);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-color-theme") as EditorialColorTheme;
      if (saved && colorPresets.some((p) => p.id === saved)) {
        applyTheme(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full border border-warm-dark/15 text-warm-gray hover:text-warm-dark hover:border-warm-dark/40 transition-all flex items-center justify-center"
        title={t.common?.switchTheme || "Ubah Warna Aksen"}
        aria-label="Change Accent Color"
      >
        <Palette size={16} className="text-warm-dark" />
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
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 top-12 w-56 rounded-2xl bg-[#F0EEE9] p-3 border border-warm-dark/15 shadow-2xl z-50 text-warm-dark"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-warm-muted px-2.5 mb-2">
                Pilih Warna Aksen
              </p>
              <div className="space-y-1">
                {colorPresets.map((preset) => {
                  const isActive = activeTheme === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        applyTheme(preset.id);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-semibold transition-all text-left ${
                        isActive
                          ? "bg-warm-card text-warm-dark font-bold border border-warm-dark/10"
                          : "text-warm-gray hover:bg-warm-card/60 hover:text-warm-dark"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full border border-warm-dark/20 flex-shrink-0 shadow-sm"
                          style={{ backgroundColor: preset.color }}
                        />
                        <span>{preset.name}</span>
                      </div>
                      {isActive && <Check size={14} className="text-warm-dark" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
