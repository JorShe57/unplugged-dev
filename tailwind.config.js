/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brewery: {
          primary: '#8B4513', // Brown
          gold: '#DAA520',    // Gold accent
          dark: '#1F1F1F',    // Dark background
        },
      },
    },
  },
  plugins: [],
}; 