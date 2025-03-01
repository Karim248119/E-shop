/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/**/*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#fffffff8",
        secondary: "#FF204E",
        third: "#00224D",
        forth: "#071952",
      },
      fontFamily: {
        homenaje: ["Homenaje", "sans-serif"],
        Dosis: ["Dosis", "sans-serif"],
      },
      fontWeight: {
        extrathin: 100,
        normal: 400,
        medium: 500,
        bold: 700,
      },
      backgroundImage: {
        "black-gray":
          " linear-gradient(-45deg, rgba(0,0,0,1) 0%, rgba(68,67,67,1) 100%, rgba(51,51,51,1) 100%)",
      },
    },
  },
  plugins: [],
};
