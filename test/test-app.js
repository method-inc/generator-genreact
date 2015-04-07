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
      '.editorconfig',
      '.eslintrc',
      'index.html',
      'index.js',
      'package.json',
      'README.md',
      'routes.js',
      'server.js',
      'webpack.client.js',
      'webpack.node.js',
      'env/node.js',
      'env/web.js',
      'handlers/Base/index.js',
      'handlers/Base/styles.css',
      'handlers/Home/index.js',
      'handlers/Home/styles.css',
      'handlers/NotFound/index.js',
      'handlers/NotFound/styles.css',
      'scripts/webpack.base.js',
      'scripts/node-white-list.js',
    ]);
  });
});
