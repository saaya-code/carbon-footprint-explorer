import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        ecoGreen: '#3BB143',
        ecoLightGreen: '#6BBF59',
        ecoDarkGreen: '#27632A',
        ecoBrown: '#8B5A2B',
        ecoBeige: '#E3DCC2',
      },
    },
  },
  plugins: [],
};
export default config;
