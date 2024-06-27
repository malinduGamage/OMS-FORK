/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff5722", // Define your custom primary color
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
   
  ],
};
