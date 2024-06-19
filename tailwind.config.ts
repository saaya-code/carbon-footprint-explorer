import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors'

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
      secondary:{
        default: colors.neutral[200],
        hover: colors.neutral[300],
        border: colors.neutral[400],
        text: colors.neutral[500],
        dark: colors.neutral[800],
        ["dark-hover"]: colors.neutral[900],
    },
    },
  },
  plugins: [],
};
export default config;
