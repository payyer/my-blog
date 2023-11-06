/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-img': "url('img/header.jpg')"
      },
      backgroundColor: {
        'rgba': 'rgba(0,0,0,0.6)',
        'rgba-topic': 'rgba(255,255,255,0.2)',
        'footer': '#212529'
      },
      colors: {
        'primary': '#495057',
        'secondary': '#6C757D'
      }
    },
  },
  plugins: [],
}

