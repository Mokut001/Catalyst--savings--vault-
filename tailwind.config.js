/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0c",
        panel: "#141417",
        accent: "#0033ad",
      },
    },
  },
  plugins: [],
}