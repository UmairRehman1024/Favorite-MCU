/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      screens: {
        "xs" : "350px",
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
