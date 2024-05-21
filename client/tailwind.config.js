import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities: Record<string, Record<string, string>> = {
        '@keyframes gradient-x': {
          '0%': {
            'background-position': '100% 0',
          },
          '100%': {
            'background-position': '0% 0',
          },
        },
      };
      const textOutlineUtilities: Record<string, Record<string, string>> = {
        '.text-outline': {
          '-webkit-text-stroke': '1.5px black',
          '-webkit-text-fill-color': '#1ED760'
        },
        '.text-outline-white': {
          '-webkit-text-stroke-color': 'white',
        },
      };
      addUtilities(textOutlineUtilities, newUtilities, ['responsive', 'hover']);
    },
  ],
};

export default config;