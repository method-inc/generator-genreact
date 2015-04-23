'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var exec = require('child_process').exec;

var INTEGRATION_PLUGINS = [
  'babel-eslint',
  'eslint',
  'eslint-plugin-react',
];

describe('react:integration', function() {
  var tmpPath;
  before(function(done) {
    var timeout = process.env.INTEGRATION_INSTALLATION_TIMEOUT ?
      parseInt(process.env.INTEGRATION_INSTALLATION_TIMEOUT, 10) : 60000;

    this.timeout(timeout);

    tmpPath = path.join(os.tmpdir(), './temp-test');
    helpers.run(path.join(__dirname, '../app'))
      .inDir(tmpPath)
      .withOptions({'skip-install': true})
      .on('end', function() {
        // manually install a few deps here
        console.log('installing minimum dependencies into %s', tmpPath);
        exec('cd ' + tmpPath + ' && npm install ' + INTEGRATION_PLUGINS.join(' '), done);
      });
  });

  it('passes eslint', function(done) {
    exec('cd ' + tmpPath +  ' && node_modules/.bin/eslint .', function(err, stdout, stderr) {
      if (err) {
        assert(false, 'Lint errors found');
        console.log(err);
      }

      if (stdout) {
        assert(!/warning/.test(stdout), stdout);
      }

      if (stderr) {
        console.error('STDERR', stderr);
      }
      done();
    });
  });
});

