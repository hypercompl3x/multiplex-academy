/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      white: "#fff",
      grey: {
        main: "#585858",
        light: "#E4E4E4",
        dark: "#3A3A3A"
      },
      blue: {
        main: "#1A2779",
        dark: "#050819"
      },
      ice: {
        main: "#92DCE5",
        light: "#C5ECF1"
      },
      orange: {
        main: "#E8B94D"
      },
      red: {
        main: "#C73636"
      },
      green: {
        main: "#5DB67B",
        dark: "#306943",
        light: "#87C99E"
      }
    }
  },
  extend: {},
  plugins: [],
};
