/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D5A3D",
        secondary: "#5B8C5A", 
        accent: "#E07A5F",
        surface: "#F7F9F7",
        background: "#FAFCFA"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
}