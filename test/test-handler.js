'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('react:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../component'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('TestComponent')
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'components/TestComponent/index.js',
      'components/TestComponent/styles.css',
    ]);
  });
});

