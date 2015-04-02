
module.exports = require('./scripts/webpack.base')({
  env: 'development',
  target: 'node',
  serverPort: <%= port %>,
});


