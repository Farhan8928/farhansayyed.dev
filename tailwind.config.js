/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paper and ink. The whole site is a printed document, not a dashboard.
        paper: { DEFAULT: '#F3EFE6', white: '#FFFDF8', deep: '#E9E3D5' },
        ink: { DEFAULT: '#14130F', soft: '#3F3B33', mute: '#7B7567', rule: '#B9B2A1' },
        before: '#C8321F', // the slow number
        after: '#0B6E45',  // the measured result
        marker: '#FFE14D'  // highlighter
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
}
