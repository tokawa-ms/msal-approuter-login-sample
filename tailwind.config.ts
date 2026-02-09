import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      colors: {
        ink: "#141414",
        mist: "#f4f5f8",
        coral: "#ff6b5c",
        lagoon: "#1a7f8a",
        midnight: "#0b1021",
      },
      boxShadow: {
        lift: "0 18px 40px -24px rgba(16, 24, 40, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
