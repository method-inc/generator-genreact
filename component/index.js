'use strict';
var path = require('path');
var chalk = require('chalk');
var util = require('../util');
var yeoman = require('yeoman-generator');
var generators = yeoman.generators;
var last = function(a) { return a[a.length - 1] };

var HandlerGenerator = module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The ReactComponent name'
    });
    // Next, add your custom code
    // this.option('parent'); // This method adds support for a `--coffee` flag
  },

  writing: function() {
    var name = last(this.name.split('/'));

    var destinationRoot = 'components/' + this.name;
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(destinationRoot + '/index.js'),
      {ComponentName: name}
    );
    this.fs.copyTpl(
      this.templatePath('styles.css'),
      this.destinationPath(destinationRoot + '/styles.css'),
      {ComponentName: name}
    );
  },
});

