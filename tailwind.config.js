/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // One accent, and it is a variable: the whole site takes the colour of
        // whichever product is open in the hero phone or in view in the work list.
        accent: 'rgb(var(--accent) / <alpha-value>)',
        base: { DEFAULT: '#09090B', 900: '#0E0E11', 800: '#131317', 700: '#1B1B20', 600: '#26262D' }
      },
      fontFamily: {
        display: ['"Clash Display"', '"Satoshi"', 'system-ui', 'sans-serif'],
        sans: ['"Satoshi"', 'system-ui', 'sans-serif']
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        scan: 'scan 2.6s ease-in-out infinite'
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-9px)' } },
        scan: { '0%,100%': { top: '6%' }, '50%': { top: '88%' } }
      }
    }
  },
  plugins: []
}
