module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        black: "#000",
        beige: {
          100: "#F6F4EF",
          500: "#E0DBD0",
        },
      },
      dropShadow: {
        'DEFAULT': '-4px 4px 4px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
