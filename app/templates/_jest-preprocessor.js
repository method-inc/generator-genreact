var babelJest = require('babel-jest');

module.exports = {
  process: function(src, filename) {
    process.env.BABEL_JEST_STAGE = 0;
    return babelJest.process(src, filename)
      .replace(/^require.*\.css.*;$/gm, '');
  },
};
