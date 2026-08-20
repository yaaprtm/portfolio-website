"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read initial state from HTML class (set by inline FOUC prevention script)
    const isLight = document.documentElement.classList.contains("light");
    setIsDark(!isLight);
  }, []);

  const toggle = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
    try {
      localStorage.setItem("portfolio-theme-mode", newIsDark ? "dark" : "light");
    } catch {
      // ignore
    }
  };

  if (!mounted) {
    // Prevent hydration mismatch: render placeholder during SSR
    return (
      <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03]" />
    );
  }

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center
                 text-slate-400 hover:text-cyan-neon hover:border-cyan-neon/30 transition-all"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
