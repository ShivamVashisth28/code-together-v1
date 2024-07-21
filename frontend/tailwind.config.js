/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        changeBg: {
          '0%,100%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition : '0% 50%' },
        },
      },
      animation: {
        changeBg : 'changeBg 5s ease infinite'
      },
    },
  },
  plugins: [],
}