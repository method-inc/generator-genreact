'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('react:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        someOption: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.editorconfig',
      'index.html',
      'index.js',
      'README.md',
      'server.js',
      'webpack.client.js',
      'webpack.node.js',
      'scripts/webpack.base.js',
      'scripts/white-list.js',
    ]);
  });
});
