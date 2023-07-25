/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      colors: {
        ignite: {
          100: '#C9E6DB',
          200: '#9FD2BF',
          300: '#74BEA3',
          400: '#4AB98C',
          500: '#00875F',
          600: '#007E56',
          700: '#006B49',
          800: '#00583B',
          900: '#00442D',
        },
      },
      gridTemplateColumns: {
        custom: '1fr 280px',
      },
    },
  },
  plugins: [],
}
