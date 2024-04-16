/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./src/**/*.{html,jsx}"
  ],

  darkMode: 'selector',
  
  theme: {
    extend: {},
  },
  
  plugins: [
    forms()
  ],
}
