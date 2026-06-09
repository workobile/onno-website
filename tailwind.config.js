/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Barlow Condensed", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        accent: "#FF0000",
      },
    },
  },
  plugins: [],
};
