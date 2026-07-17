/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0a0a',
          900: '#121212',
          850: '#171717',
          800: '#1c1c1c',
          700: '#262626',
          600: '#333333',
          500: '#4d4d4d',
        },
        gold: {
          400: '#ffd54a',
          500: '#f5b800',
          600: '#e0a500',
          700: '#b98600',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(245,184,0,0.15), 0 8px 24px -8px rgba(245,184,0,0.25)',
      },
    },
  },
  plugins: [],
}
