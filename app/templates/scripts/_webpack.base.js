var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var fs = require('fs');
var readdir = fs.readdirSync;
var WHITE_LIST_OF_NODE_MODULES = require('./node-white-list');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var postcssImport = require('postcss-import');
var precss = require('precss');
var styleVars = require('../globalStyleVars');

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
  var serverPort = options.serverPort || 4444;

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
      publicPath: options.hotServerPort ?
        'http://localhost:' + options.hotServerPort + '/dist/' :
        options.cdn,
    },

    resolve: {
      modulesDirectories: [
        'node_modules',
        'components',
        '../components',
        'lib',
      ],
    },

    module: {
      // extensions: ['', '.webpack.js', '.web.js', '.js', '.css'],

      loaders: [
        { test: /\.css$/,
          loader: options.env !== 'development' ?
            ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss!autoprefixer') :
            'style!css?importLoaders=1!postcss!autoprefixer',
        },
        {test: /\.json$/, loader: 'json'},
        {test: /\.jsx?$/,
          exclude: [
            // exclude everything that isn’t a react- component
            /node_modules(?!\/react-)/,
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
        'process.env.PORT': JSON.stringify(serverPort),
      }),

      new webpack.optimize.DedupePlugin(),

      // TODO: optimize this by build
      (options.env !== 'development' && new ExtractTextPlugin('styles.css')),
      (options.env !== 'development' && new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }))
    ),

    devtool: 'sourcemap',

    postcss: function (webpack) {
      return [
        postcssImport({
          addDependencyTo: webpack
        }),
        precss({
          variables: { variables: styleVars }
        })
      ];
    },

    autoprefixer: {
      browsers: 'last 2 version',
    },

    __options: options,
  };
};
