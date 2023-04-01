/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        texturina: ['Texturina'],
        roboto: ['Roboto'],
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
