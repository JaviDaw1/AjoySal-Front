/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import 'flowbite';

export default {
  content: [
    "./src/**/*.{html,jsx}",
    "./node_modules/flowbite/**/*.js"
  ],

  darkMode: 'selector',
  
  theme: {
    extend: {},
  },
  
  plugins: [
    forms(),
    'flowbite/plugin'
  ],
}
