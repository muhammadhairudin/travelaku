/* eslint-env node */
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1E3D59',
        secondary: '#F5F0E1'
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: [daisyui]
};