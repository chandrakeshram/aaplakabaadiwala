/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neonBlue: '#00f7ff',
        neonPink: '#ff00e6',
        deepDark: '#0a0a0a',
        darkBackground: '#13141f', // A solid dark blue for the dark mode background
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00f7ff, 0 0 20px #00f7ff, 0 0 40px #00f7ff',
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};