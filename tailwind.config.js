/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow:{
        soft:"0px 20px 30px -10px rgba(0,0,0,0.05)"
      }
    },
  },
  plugins: [require('daisyui')],
}
