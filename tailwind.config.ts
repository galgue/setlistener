import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spotify: {
          background: "#000000",
          header: "#232323",
          row: "#121212",
          green: "#1DB954",
        },
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [],
} satisfies Config;
