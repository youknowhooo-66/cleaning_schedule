/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f4f6fc',
          100: '#e5eaf8',
          200: '#c5d1ef',
          300: '#95afe2',
          400: '#5e85d1',
          500: '#3a62be',
          600: '#2a4898',
          700: '#233979',
          800: '#1f3164',
          900: '#1e2b52',
          950: '#141c37',
        },
        accent: {
          50: '#fff5f0',
          100: '#ffe8dd',
          200: '#ffceb9',
          300: '#ffab8a',
          400: '#ff7b4b',
          500: '#fe571c',
          600: '#ef3b07',
          700: '#c62808',
          800: '#9d220f',
          900: '#7e1f10',
          950: '#440d06',
        }
      }
    },
  },
  plugins: [],
}
