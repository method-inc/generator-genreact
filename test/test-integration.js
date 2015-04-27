/*eslint no-console: 0*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var exec = require('child_process').exec;

var _helpers = require('./helpers');
var once = _helpers.once;
var flaky = _helpers.flaky;


var INTEGRATION_PLUGINS = [
  'babel-eslint',
  'eslint',
  'eslint-plugin-react',
  'rework',
  'glob',
  'rework-suit-conformance',
];

describe('react:integration', function() {
  var tmpPath;
  before(function(done) {
    var reallyDone = once(done);
    var timeout = process.env.INTEGRATION_INSTALLATION_TIMEOUT ?
      parseInt(process.env.INTEGRATION_INSTALLATION_TIMEOUT, 10) : 60000;

    this.timeout(0);
    setTimeout(reallyDone, timeout);

    tmpPath = path.join(os.tmpdir(), './temp-test');
    helpers.run(path.join(__dirname, '../app'))
      .inDir(tmpPath)
      .withOptions({'skip-install': true})
      .on('end', function() {
        // manually install a few deps here
        console.log('installing minimum dependencies into %s', tmpPath);
        exec('cd ' + tmpPath + ' && npm install ' + INTEGRATION_PLUGINS.join(' '), reallyDone);
      });
  });

  it('passes eslint', flaky(function(done) {
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
  }));

  it('Suit conformance', flaky(function(done) {
    exec('node ' + tmpPath + '/scripts/suit-conformance', function(err, stdout, stderr) {
      if (err) {
        console.log(err);
        assert(false, 'Suit Conformance errors found.');
      }

      if (stdout) {
        assert(!/warning/.test(stdout), stdout);
      }

      if (stderr) {
        console.error(stderr);
        assert(false, 'Suit Conformance errors found.');
      }
      done();
    });
  }));

});

