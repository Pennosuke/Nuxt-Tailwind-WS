const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: '#3498DB',
      secondary: '#F1C40F',
      neutral: '#34495E',
      success: '#2ECC71',
      danger: '#E74C3C'
    }
  },
  variants: {},
  plugins: [],
  options: {
    prefix: '',
    important: false,
    separator: ':'
  },
  experiments: {
    shadowLookup: true
  }
}
