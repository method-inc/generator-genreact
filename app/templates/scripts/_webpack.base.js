var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var fs = require('fs');
var readdir = fs.readdirSync;
var WHITE_LIST_OF_NODE_MODULES = require('./node-white-list');

var concat = function() {
  var args = Array.prototype.slice.call(arguments);
  var result = args.reduce(function(o, a) {
    if (a) {
      return o.concat(a);
    }
    return o;
  }, []);
  return result;
};

var HOT_SERVER = function(port) {
  if (typeof port === 'undefined') {
    return [];
  }

  return [
    'webpack-dev-server/client?http://0.0.0.0:' + port,
    'webpack/hot/only-dev-server',
  ];
};

/**
 * @param {Object} options
 * @param {boolean} options.hotloader
 * @param {string} options.env development | production
 */
module.exports = function(options) {
  var entry = glob.sync('handlers/*/*.js').reduce(function(o, n) {
    o[n.split('.')[0].toLowerCase()] = HOT_SERVER(options.hotServerPort);
    return o;
  }, {});
  entry.client = HOT_SERVER(options.hotServerPort).concat('./env/web');

  var nodeModules = {};
  if (options.target === 'node') {
    entry = './env/node';
    readdir('node_modules')
      .filter(function(x) {
        return !(['.bin'].indexOf(x) === -1 &&
          WHITE_LIST_OF_NODE_MODULES.indexOf(x) !== -1);
      })
      .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
      });

  }

  return {
    externals: nodeModules,
    cache: true,
    context: path.join(__dirname, '..'),
    entry: entry,

    target: options.target,

    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: '[name].js',
      publicPath: 'http://localhost:' + options.hotServerPort + '/dist/',
    },

    resolve: {
      modulesDirectories: [
        'node_modules',
        'components',
        '../components',
      ],
    },

    module: {
      // extensions: ['', '.webpack.js', '.web.js', '.js', '.css'],

      loaders: [
        {test: /\.css$/, loader: 'style!rework-webpack'},
        {test: /\.json$/, loader: 'json'},
        {test: /\.jsx?$/,
          exclude: [
            // exclude everything that isn’t a react- component
            /node_modules(?!\/react-)/,
            // /node_modules/
          ],
          loaders: concat(
            options.hotloader && 'react-hot',
            'babel?{"optional": "runtime", "stage": 1}'
          ),
        },
      ],
    },

    plugins: concat(
      (options.target === 'node' && new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop')),
      (options.target === 'node' && options.env === 'development' &&
        new webpack.BannerPlugin(
          'require("source-map-support").install();',
          {raw: true, entryOnly: false}
        )
      ),

      (options.hotloader && [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ]),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.env || 'development'),
        '__APP_SERVER__': JSON.stringify('http://localhost:' + options.serverPort),
      }),

      new webpack.optimize.DedupePlugin()
    ),

    devtool: 'sourcemap',

    /*
    rework: {
      use: [
        rework.plugins.urls,
        vars({map: {}})
      ]
    }
    esprima: {
      transformers: []
    },
    */

    __options: options,
  };
};

