/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      black: "#000",
      white: "#fff",
      blue: {
        main: "#1A2779",
        dark: "#050819"
      },
      ice: {
        main: "#92DCE5"
      },
      orange: {
        main: "#E8B94D"
      }
    }
  },
  extend: {},
  plugins: [],
};
