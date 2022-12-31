/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        'rev-45': '-45deg',
        'rev-30': '-30deg',
      },
      fontFamily : {
        brand: ['Pacifico'],
      },
      gridTemplateColumns:{
        '1-board': 'repeat(1, minmax(200px, 1fr))',
        '2-board': 'repeat(2, minmax(200px, 1fr))',
        '3-board': 'repeat(3, minmax(200px, 1fr))',
        '4-board': 'repeat(4, minmax(200px, 1fr))',
        '5-board': 'repeat(5, minmax(200px, 1fr))',
      }

    },
  },
  plugins: [],
}
