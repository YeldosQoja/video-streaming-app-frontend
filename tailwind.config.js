/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr))",
      },
      gridTemplateRows: {
        auto: "repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr))",
      },
      keyframes: {
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        slideUpAndFade: "slideUpAndFade 200ms ease-out",
        slideRightAndFade: "slideRightAndFade 200ms ease-out",
        slideDownAndFade: "slideDownAndFade 200ms ease-out",
        slideLeftAndFade: "slideLeftAndFade 200ms ease-out",
      },
    },
  },
  plugins: [],
};
