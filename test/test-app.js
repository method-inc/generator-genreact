'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('genreact:app', function() {

  describe('default case', function() {
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
        '.gitignore',
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
        'env/webpack.js',
        'handlers/Base/index.js',
        'handlers/Base/styles.css',
        'handlers/Home/index.js',
        'handlers/NotFound/index.js',
        'handlers/NotFound/styles.css',
        'scripts/build.js',
        'scripts/node-white-list.js',
        'scripts/suit-conformance.js',
        'scripts/webpack.base.js',
      ]);
    });

    it('defaults to hapi', function() {
      assert.fileContent('env/node.js', /hapi/);
      assert.fileContent('package.json', /hapi/);
    });

  });

  describe('with options', function() {
    before(function(done) {
      this.timeout(3000);
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({
          'skip-install': true,
          'server': 'express',
        })
        .withArguments('MyApp')
        .on('end', done);
    });

    it('generates an express app', function() {
      assert.fileContent('env/node.js', /express/);
      assert.fileContent('package.json', /express/);
    });
  });

});
