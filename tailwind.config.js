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
          primary: '#8B4513',
          gold: '#DAA520',
          dark: '#2D1810',
        },
        'brewery-gold': '#d4af37',
        'brewery-primary': '#8B4513', 
        'brewery-dark': '#2D1810',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.force-color': {
          '-webkit-text-fill-color': 'unset !important',
        },
        '.force-brewery-gold': {
          'color': '#d4af37 !important',
          '-webkit-text-fill-color': '#d4af37 !important',
        },
        '.force-brewery-primary': {
          'color': '#8B4513 !important', 
          '-webkit-text-fill-color': '#8B4513 !important',
        }
      })
    }
  ]
}