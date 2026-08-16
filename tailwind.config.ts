import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep obsidian matte velvet backgrounds (Vercel / Linear / Raycast human design aesthetic)
        navy: {
          950: "#090A0C", // Deepest matte obsidian
          900: "#0F1115",
          800: "#16181E",
          700: "#1E2129",
          600: "#2B2F3B",
        },
        // Primary Accent: Electric Ice-Lime (Bespoke modern high-tech color used by top design studios)
        cyan: {
          neon: "#D4FF00", // Ice Lime
          glow: "#C4F000",
          dim: "#88B000",
          soft: "rgba(212, 255, 0, 0.08)",
        },
        // Secondary Accent: Electric Sky Blue
        blue: {
          electric: "#38BDF8",
          bright: "#60A5FA",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 8s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "radial-spotlight":
          "radial-gradient(circle at 50% -10%, rgba(212, 255, 0, 0.07), transparent 60%), radial-gradient(circle at 80% 60%, rgba(56, 189, 248, 0.04), transparent 50%)",
        "ambient-grid":
          "linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "48px 48px",
      },
      boxShadow: {
        "subtle": "0 4px 30px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 255, 0, 0.06)",
        "accent": "0 0 25px rgba(212, 255, 0, 0.25)",
      },
      borderColor: {
        "subtle": "rgba(255, 255, 255, 0.08)",
        "subtle-hover": "rgba(212, 255, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
