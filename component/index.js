'use strict';
var yeoman = require('yeoman-generator');
var last = function(a) { return a[a.length - 1]; };

var HandlerGenerator = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The ReactComponent name',
    });

    this.option('handler'); // This method adds support for a `--handler` flag
    this.option('component');
  },

  writing: function() {
    var name = last(this.name.split('/'));
    var handlerRoot = this.options.handler ? 'handlers/' + this.options.handler + '/' : '';
    var componentRoot = this.options.component ? 'components/' + this.options.component + '/' : '';

    var destinationRoot = (this.options.handler ? handlerRoot : componentRoot) + 'components/' + this.name;
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
    this.fs.copyTpl(
      this.templatePath('__tests__/index.js'),
      this.destinationPath(destinationRoot + '/__tests__/index.js'),
      {ComponentName: name}
    );
  },
});


module.exports = HandlerGenerator;
