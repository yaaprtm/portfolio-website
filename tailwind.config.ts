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
        // Warm Editorial Palette
        offwhite: "#F0EEE9",
        paper: "#F7F5F0",
        "warm-card": "#E8E4DD",
        "warm-card-hover": "#E1DCD4",
        "warm-dark": "#1A1A1A",
        "warm-gray": "#4A4A4A",
        "warm-muted": "#737373",
        "warm-border": "#D8D3C8",
        olive: {
          50: "#F4F5F0",
          100: "#E5E7DC",
          200: "#C9CEB7",
          300: "#ACB491",
          400: "#8C966F",
          500: "#6B7355", // Main Olive Accent
          600: "#555D42", // Hover
          700: "#424933",
          800: "#303524",
          900: "#1E2216",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        editorial: "0 10px 30px -10px rgba(26, 26, 26, 0.08)",
        "editorial-hover": "0 20px 40px -15px rgba(26, 26, 26, 0.14)",
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
