'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('best:app', function() {
  before(function(done) {
    this.timeout(3000);
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({'skip-install': true})
      .withArguments('MyApp')
      .on('end', done);
  });

  it('creates files', function() {
    assert.file([
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      'index.html',
      'index.js',
      'jest-preprocessor.js',
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
      'handlers/NotFound/index.js',
      'handlers/NotFound/styles.css',
      'scripts/node-white-list.js',
      'scripts/suit-conformance.js',
      'scripts/webpack.base.js',
    ]);
  });

});
