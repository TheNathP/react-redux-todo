/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      fontFamily: {
        mainFont: ['Stereonic', 'sans-serif'],
        sndFont: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

