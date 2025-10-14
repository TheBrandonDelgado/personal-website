/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Space-themed golden colors (same for both modes)
        "space": {
          "primary": "#fbbf24",
          "secondary": "#f59e0b",
          "tertiary": "#fde047",
          "quaternary": "#fef3c7",
        },
        // Dark mode colors (default)
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
        "gradient-sunrise":
          "linear-gradient(135deg, #fef3c7, #fbbf24, #f59e0b)",
        "gradient-golden": "linear-gradient(135deg, #fde047, #fbbf24, #f59e0b)",
        "hero-bg": "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)",
        "hero-glow-1":
          "radial-gradient(circle at 30% 40%, rgba(251, 191, 36, 0.2) 0%, transparent 60%)",
        "hero-glow-2":
          "radial-gradient(circle at 70% 20%, rgba(253, 224, 71, 0.15) 0%, transparent 50%)",
        "hero-glow-3":
          "radial-gradient(circle at 50% 70%, rgba(254, 243, 199, 0.1) 0%, transparent 70%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "twinkle": "twinkle 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out",
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
        "twinkle": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
        "fade-in-up": {
          "from": { opacity: "0", transform: "translateY(20px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
      },
      boxShadow: {
        "glow-golden": "0 0 20px rgba(251, 191, 36, 0.4)",
        "glow-golden-lg": "0 0 30px rgba(251, 191, 36, 0.5)",
        "glow-golden-xl": "0 0 40px rgba(251, 191, 36, 0.6)",
      },
    },
  },
  plugins: [],
};
