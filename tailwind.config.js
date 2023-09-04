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
        headerBanner:
          "url('https://res.cloudinary.com/abbifam-com/image/upload/v1692119792/ESDM/bpsdm-banner-min_ep8zoe.png')",
        lightYellow:
          "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 229, 0, 1) 35%, rgba(255, 229, 0, 1) 100%)",
      },
    },
  },
}
