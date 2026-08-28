"use client";

import { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export type EditorialColorTheme = "slateBlue" | "charcoal" | "burgundy" | "emerald" | "navy" | "deepPurple";

export interface ColorPreset {
  id: EditorialColorTheme;
  name: string;
  color: string;
  hoverColor: string;
  softColor: string;
}

export const colorPresets: ColorPreset[] = [
  {
    id: "slateBlue",
    name: "Slate Blue",
    color: "#475569",
    hoverColor: "#334155",
    softColor: "rgba(71, 85, 105, 0.15)",
  },
  {
    id: "charcoal",
    name: "Charcoal Grey",
    color: "#374151",
    hoverColor: "#1F2937",
    softColor: "rgba(55, 65, 81, 0.15)",
  },
  {
    id: "burgundy",
    name: "Deep Burgundy",
    color: "#7C2D3A",
    hoverColor: "#5F2230",
    softColor: "rgba(124, 45, 58, 0.15)",
  },
  {
    id: "emerald",
    name: "Forest Emerald",
    color: "#047857",
    hoverColor: "#065F46",
    softColor: "rgba(4, 120, 87, 0.15)",
  },
  {
    id: "navy",
    name: "Professional Navy",
    color: "#1E3A8A",
    hoverColor: "#1E40AF",
    softColor: "rgba(30, 58, 138, 0.15)",
  },
  {
    id: "deepPurple",
    name: "Executive Purple",
    color: "#6B21A8",
    hoverColor: "#581C87",
    softColor: "rgba(107, 33, 168, 0.15)",
  },
];

export default function ThemeSwitcher() {
  const { t } = useLanguage();
  const { play } = useSoundEffects();
  const [activeTheme, setActiveTheme] = useState<EditorialColorTheme>("slateBlue");
  const [open, setOpen] = useState(false);

  const applyTheme = (presetId: EditorialColorTheme) => {
    play("click");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    play("open");
    setOpen(!open);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={handleOpen}
        className="p-2 rounded-full border border-mono-border text-mono-gray hover:text-mono-black hover:border-mono-black transition-all flex items-center justify-center"
        title={t.common?.switchTheme || "Ubah Warna Aksen"}
        aria-label="Change Accent Color"
      >
        <Palette size={16} className="text-mono-black" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                play("close");
                setOpen(false);
              }}
              className="fixed inset-0 z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 top-12 w-56 rounded-2xl bg-white p-3 border border-mono-border shadow-2xl z-50 text-mono-black"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-mono-gray px-2.5 mb-2">
                {(t.common as any)?.colorThemeLabel || "Pilih Warna Aksen"}
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
                      onMouseEnter={() => play("hover")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-semibold transition-all text-left ${
                        isActive
                          ? "bg-mono-card text-mono-black font-bold border border-mono-border"
                          : "text-mono-gray hover:bg-mono-card/60 hover:text-mono-black"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full border border-mono-border flex-shrink-0 shadow-sm"
                          style={{ backgroundColor: preset.color }}
                        />
                        <span>{preset.name}</span>
                      </div>
                      {isActive && <Check size={14} className="text-mono-black" />}
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
