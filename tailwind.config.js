/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "space": {
          "primary": "#fbbf24",
          "secondary": "#f59e0b",
          "tertiary": "#fde047",
          "quaternary": "#fef3c7",
        },
        "bg": {
          "primary": "#0a0a0a",
          "secondary": "#111111",
          "tertiary": "#1a1a1a",
        },
        "text": {
          "primary": "#ffffff",
          "secondary": "#d1d5db",
          "muted": "#9ca3af",
        },
        "border": "#262626",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #fbbf24, #f59e0b)",
        "gradient-secondary": "linear-gradient(135deg, #fde047, #fbbf24)",
        "gradient-space": "linear-gradient(135deg, #1e293b, #334155, #475569)",
        "gradient-sunrise": "linear-gradient(135deg, #fef3c7, #fbbf24, #f59e0b)",
        "gradient-golden": "linear-gradient(135deg, #fde047, #fbbf24, #f59e0b)",
        "hero-bg": "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.3",
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            opacity: "0.6",
            transform: "translate(-50%, -50%) scale(1.2)",
          },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
        "mono": ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "glow-golden": "0 0 20px rgba(251, 191, 36, 0.4)",
        "glow-golden-lg": "0 0 30px rgba(251, 191, 36, 0.5)",
        "glow-golden-xl": "0 0 40px rgba(251, 191, 36, 0.6)",
        "glass-hover": "0 0 30px rgba(251, 191, 36, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4)",
      },
      borderRadius: {
        "sm-token": "8px",
        "md-token": "12px",
        "lg-token": "16px",
      },
    },
  },
  plugins: [],
};
