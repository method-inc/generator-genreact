'use strict';
var util = require('../util');
var yeoman = require('yeoman-generator');
var generators = yeoman.generators;

function appendRoute(file, route, parentRoute) {
  util.transformFile({
    file: file,
    transform: {
      type: 'appendRoute',
      route: route,
      parentRoute: parentRoute,
    },
  });
}

var HandlerGenerator = generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The RouteHandler name',
    });
    // Next, add your custom code
    this.option('parent'); // This method adds support for a `--coffee` flag
  },
  /*
  prompting: function() {
    var done = this.async();
    this.prompt({
      type   : 'input',
      name   : 'RouteName',
      message: 'What route name?',
      default: 'DefaultHandler',
    }, function(answers) {
      this.RouteName = answers.RouteName;
      this.log(answers.RouteName);

      done();
    }.bind(this));
  },
  */

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('handler.js'),
      this.destinationPath('handlers/' + this.name + '/index.js'),
      {RouteName: this.name}
    );
    this.fs.copyTpl(
      this.templatePath('styles.css'),
      this.destinationPath('handlers/' + this.name + '/styles.css'),
      {RouteName: this.name}
    );

    /*
    appendRoute.call(this,
      'routes.js',
      this.name,
      this.options.parent
    );
    */
  },
});

module.exports = HandlerGenerator;
