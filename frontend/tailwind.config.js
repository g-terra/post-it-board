/** @type {import('tailwindcss').Config} */
const theme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./pages/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'board': "url('/pinboard-bg.jpg')",
            },
            colors: {
                primary: {
                    100: colors.sky[100],
                    200: colors.sky[200],
                    300: colors.sky[300],
                    400: colors.sky [400],
                    500: colors.sky [500],
                    600: colors.sky [600],
                    700: colors.sky [700],
                    800: colors.sky [800],
                    900: colors.sky [900],
                    DEFAULT: colors.sky [500],
                    dark: colors.sky [900],
                    light: colors.sky [300],
                },
                secondary: {
                    100: colors.teal[100],
                    200: colors.teal[200],
                    300: colors.teal[300],
                    400: colors.teal[400],
                    500: colors.teal[500],
                    600: colors.teal[600],
                    700: colors.teal[700],
                    800: colors.teal[800],
                    900: colors.teal[900],
                    DEFAULT: colors.emerald[400],
                    dark: colors.teal[900],
                    light: colors.teal[300],
                    night: {
                        100: colors.violet[100],
                        200: colors.violet[200],
                        300: colors.violet[300],
                        400: colors.violet[400],
                        500: colors.violet[500],
                        600: colors.violet[600],
                        700: colors.violet[700],
                        800: colors.violet[800],
                        900: colors.violet[900],
                        DEFAULT: colors.violet[500],
                        dark: colors.violet[900],
                        light: colors.violet[300],
                    },
                },
                accent: {
                    100: colors.red[100],
                    200: colors.red[200],
                    300: colors.red[300],
                    400: colors.red[400],
                    500: colors.red[500],
                    600: colors.red[600],
                    700: colors.red[700],
                    800: colors.red[800],
                    900: colors.red[900],
                    DEFAULT: colors.red[500],
                    dark: colors.red[900],
                    light: colors.red[400],
                },

            },
            rotate: {
                'rev-45': '-45deg',
                'rev-30': '-30deg',
            },
            fontFamily: {
                brand: ['Pacifico'],
            },
            gridTemplateColumns: {
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
