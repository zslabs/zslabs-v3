const { browserslist } = require('./package.json')

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-lightningcss': {
      browsers: browserslist.join(', '),
    },
  },
}
