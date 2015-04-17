module.exports = require('./scripts/webpack.base')({
  hotloader: true,
  serverPort: <%= port %>,
  hotServerPort: <%= hotServerPort %>,
  env: 'development',
  target: 'web',
});


