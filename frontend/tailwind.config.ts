import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}", "./public/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
