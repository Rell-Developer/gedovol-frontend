/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        color1: "#FFE6E6",
        color2: "#D80404",
        color3: "#BD1616",
        color4: "#000000"
      }
    },
  },
  plugins: [],
}
