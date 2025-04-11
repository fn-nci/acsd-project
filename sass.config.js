const sass = require('sass');

module.exports = {
  implementation: sass,
  sassOptions: {
    fiber: false,
    outputStyle: 'expanded',
  },
}; 