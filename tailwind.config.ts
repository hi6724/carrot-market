import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        hunmok: '120px',
      },
      borderColor: {
        hunmok: 'tomato',
      },
      backgroundColor: {
        hunmok: 'tomato',
      },
    },
  },
  plugins: [],
};
export default config;
