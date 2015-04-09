var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.client');
var port = config.__options.hotServerPort;
var debug = require('debug')('server');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(port, 'localhost', function(err, result) {
  if (err) {
    return debug(err);
  }
  debug('Listening at localhost:' + port);
});

