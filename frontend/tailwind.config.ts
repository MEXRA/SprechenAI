import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17231e",
        cream: "#f7f5ee",
        moss: {
          50: "#eef7f1",
          100: "#d9ecdf",
          400: "#58a872",
          500: "#358958",
          600: "#287047",
          700: "#245b3d",
          900: "#193728"
        },
        coral: "#f48765",
        gold: "#e3b94f"
      },
      boxShadow: {
        card: "0 18px 50px -28px rgba(24, 55, 40, 0.32)",
        float: "0 24px 60px -24px rgba(13, 45, 31, 0.35)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    },
  },
  plugins: [],
};

export default config;

