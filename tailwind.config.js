/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      translate: {
        'full': '100%',
        '-full': '-100%',
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
};

