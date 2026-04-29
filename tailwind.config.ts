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
        brand: {
          orange: "#FF6B35",
          yellow: "#FFD166",
          green: "#06D6A0",
          purple: "#7B2D8B",
          bg: "#FFFBF5",
          card: "#FFFFFF",
          text: "#1A1A2E",
          muted: "#6B7280",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(26,26,46,0.08)",
        "card-hover": "0 6px 24px 0 rgba(26,26,46,0.14)",
        primary: "0 4px 20px 0 rgba(255,107,53,0.35)",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 1s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
