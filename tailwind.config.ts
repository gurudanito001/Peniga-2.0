import type { Config } from 'tailwindcss';
import daisyui from 'daisyui'

const config: Config = {
  
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        "primary": "#691883",
        "secondary": "#b148d2",
        "accent": "#c1246b",
        "neutral": "(243,204,255)",
        "base": "#f6f3fd",
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), daisyui],
  daisyui: {
    themes: [
       "dark", 
       "cupcake"
    ],
  },
  
};
export default config;
