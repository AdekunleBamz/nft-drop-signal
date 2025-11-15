import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Chocolate-brown palette
        choco: {
          50: '#f6efe9',
          100: '#eddacf',
          200: '#e1c6b0',
          300: '#d4b191',
          400: '#c89475',
          500: '#b06a4f',
          600: '#8a4d3c',
          700: '#6a392b',
          800: '#43261a',
          900: '#2b140f',
        },
        brown: {
          400: '#8b5e3c',
        },
      },
    },
  },
  plugins: [],
}

export default config
