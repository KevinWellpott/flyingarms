/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#76E4F7',
          glow: '#76E4F7',
        },
        background: '#0f172a',
        surface: 'rgba(30, 41, 59, 0.7)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-soft': '0 0 20px rgba(118, 228, 247, 0.4)',
        'glow-medium': '0 0 30px rgba(118, 228, 247, 0.6)',
        'glow-strong': '0 0 40px rgba(118, 228, 247, 0.8)',
      },
    },
  },
  plugins: [],
}

