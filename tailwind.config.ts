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
        // Eye-friendly Deep Navy/Slate backgrounds (WCAG compliant)
        navy: {
          950: "#0B1120", // Deepest soft navy
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
          600: "#475569",
        },
        // Dynamic Accent: Soft Electric Blue (#3B82F6 / #60A5FA)
        cyan: {
          neon: "var(--color-cyan)",
          glow: "var(--color-cyan-glow)",
          dim: "var(--color-cyan-dim)",
          soft: "var(--color-cyan-soft)",
        },
        blue: {
          electric: "#3B82F6",
          bright: "#60A5FA",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "Fira Code", "monospace"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
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
          "radial-gradient(circle at 50% -10%, rgba(59, 130, 246, 0.12), transparent 60%), radial-gradient(circle at 80% 60%, rgba(96, 165, 250, 0.06), transparent 50%)",
        "ambient-grid":
          "radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "36px 36px",
      },
      boxShadow: {
        "subtle": "0 4px 30px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px var(--color-cyan-soft)",
        "accent": "0 0 25px var(--color-cyan-soft)",
      },
      borderColor: {
        "subtle": "rgba(255, 255, 255, 0.08)",
        "subtle-hover": "var(--color-border-hover)",
      },
    },
  },
  plugins: [],
};

export default config;
