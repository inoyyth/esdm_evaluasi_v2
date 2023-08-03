/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        lightYellow:
          "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 229, 0, 1) 35%, rgba(255, 229, 0, 1) 100%)",
      },
    },
  },
}
