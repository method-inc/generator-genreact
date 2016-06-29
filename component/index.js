'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var last = function(a) { return a[a.length - 1]; };

var HandlerGenerator = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The ReactComponent name',
    });

    this.argument('props', {
      required: false,
      type: Array,
      desc: 'The props',
      default: [],
    });

    this.option('handler'); // This method adds support for a `--handler` flag
    this.option('component');
  },

  writing: function() {
    let nameArray = this.name.split('/');
    var name = _.upperFirst(last(nameArray));
    nameArray[nameArray.length - 1] = name;
    var fileName = nameArray.join('/');

    var handlerRoot = this.options.handler ? 'handlers/' + this.options.handler + '/' : '';
    var componentRoot = this.options.component ? 'components/' + this.options.component + '/' : '';

    var destinationRoot = (this.options.handler ? handlerRoot : componentRoot) + 'components/' + fileName;
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(destinationRoot + '/index.js'),
      {ComponentName: name, props: this.props}
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
