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
        // Deep obsidian charcoal backgrounds (Linear / Supabase style)
        navy: {
          950: "#070A0F",
          900: "#0D111A",
          800: "#131926",
          700: "#1A2234",
          600: "#222D45",
        },
        // Primary Accent: Terminal Mint / Cyber Emerald
        cyan: {
          neon: "#00F5A0", // Electric Mint Emerald
          glow: "#00E599",
          dim: "#00A86B",
          soft: "rgba(0, 245, 160, 0.1)",
        },
        // Secondary Accent: Electric Violet / Cyber Purple
        blue: {
          electric: "#8B5CF6",
          bright: "#A855F7",
        },
        // Accent Tertiary: Cyber Amber
        amber: {
          glow: "#F59E0B",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "typing": "typing 3.5s steps(40, end)",
        "spin-slow": "spin 8s linear infinite",
        "network-flow": "network-flow 20s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 245, 160, 0.3), 0 0 40px rgba(0, 245, 160, 0.1)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(0, 245, 160, 0.6), 0 0 60px rgba(0, 245, 160, 0.3)",
          },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "network-flow": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0, 245, 160, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 160, 0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 245, 160, 0.15), transparent)",
        "hero-gradient":
          "radial-gradient(ellipse 60% 60% at 30% 40%, rgba(0, 245, 160, 0.12), transparent 60%), radial-gradient(ellipse 60% 60% at 70% 60%, rgba(139, 92, 246, 0.1), transparent 60%)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0, 245, 160, 0.3), 0 0 40px rgba(0, 245, 160, 0.1)",
        "neon-cyan-lg": "0 0 30px rgba(0, 245, 160, 0.5), 0 0 60px rgba(0, 245, 160, 0.2)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.5)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 245, 160, 0.18)",
      },
      borderColor: {
        "neon": "rgba(0, 245, 160, 0.3)",
        "neon-bright": "rgba(0, 245, 160, 0.7)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
