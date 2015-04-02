var webpack = require('webpack');
var config = require('./webpack.node');
var exec = require('child_process').exec;

config.watch = true;

var serverProcess;

webpack(config, function(err, stats) {
  if (err) return console.error(err);

  if (stats.hasErrors && stats.hasErrors.length) {
    var json = stats.toJson();
    console.log('stats.hasErrors', json.errors);
  }

  if (stats.hasWarning) {
    console.log('Warnings! Warnings!');
  }

  if (serverProcess) {
    console.log('restarting server');
    serverProcess.kill();
  }
  else console.log('starting server');

  serverProcess = exec('node ./dist/main');
  serverProcess.stdout.on('data', function(chunk) {
    console.log(chunk.toString());
  });

});

