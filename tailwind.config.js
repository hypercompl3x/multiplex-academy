/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
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
      },
      red: {
        main: "#C73636"
      },
      green: {
        main: "#5DB67B",
        dark: "#306943"
      }
    }
  },
  extend: {},
  plugins: [],
};
