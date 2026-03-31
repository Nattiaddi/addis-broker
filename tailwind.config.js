/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'addis-black': '#050505',
        'addis-dark': '#121212',
        'addis-gold': {
          light: '#F1D279',
          DEFAULT: '#D4AF37',
          dark: '#AA8A2E',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}