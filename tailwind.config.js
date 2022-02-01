const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.tsx', './src/*.tsx'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      ...colors,
      transparent: 'transparent',
      black: '#000',
      white: '#fff',

      primary: {
        300: '#99b1ff',
        500: '#3363ff',
        700: '#001866'
      },
      secondary: {
        300: '#fec69a',
        500: '#fd8e35',
        700: '#ca5b02'
      },
      gray: {
        50: '#fff',
        200: '#f8f8f9',
        500: '#e3e5e9'
      }
    },
    extend: {},
  },
  plugins: [],
};
