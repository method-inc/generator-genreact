'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('best:handler', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../handler'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments('MyHandler')
      .on('end', done);
  });

  it('creates files', function() {
    assert.file([
      'handlers/MyHandler/index.js',
    ]);
  });
});

