/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr))',
      },
      gridTemplateRows: {
        'auto': 'repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr))',
      }
    },
  },
  plugins: [],
}

