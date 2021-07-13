module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FF6363',
        secondary: {
          100: '#E2E2D5',
          200: '#888883'
        },
        humber: {
          1: '#efe9e7',
          2: '#3D1101',
          3: '#FFFFB3'
        }
      },
      backgroundImage: theme => ({
        humber: "url('./six/header_desktop.png')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
