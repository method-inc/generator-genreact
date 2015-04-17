var webpack = require('webpack');
var config = require('./webpack.node');
var exec = require('child_process').exec;
var debug = require('debug')('index');

config.watch = true;

var serverProcess;

webpack(config, function(err, stats) {
  if (err) {
    return debug(err);
  }

  if (stats.hasErrors && stats.hasErrors.length) {
    var json = stats.toJson();
    debug('stats.hasErrors', json.errors);
  }

  if (stats.hasWarning) {
    debug('Warnings! Warnings!');
  }

  if (serverProcess) {
    debug('restarting server');
    serverProcess.kill();
  }
  else {
    debug('starting server');
  }

  serverProcess = exec('node ./dist/main');
  serverProcess.stdout.on('data', function(chunk) {
    debug(chunk.toString());
  });

  serverProcess.stderr.on('data', function(chunk) {
    debug(chunk.toString());
  });

});

