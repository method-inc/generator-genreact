'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');
var generators = yeoman.generators;
var last = function(a) { return a[a.length - 1]; };

// function appendRoute(file, route, parentRoute) {
//   transformFile({
//     file: file,
//     transform: {
//       type: 'appendRoute',
//       route: route,
//       parentRoute: parentRoute,
//     },
//   });
// }

var HandlerGenerator = generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The RouteHandler name',
    });

    this.argument('props', {
      required: false,
      type: Array,
      desc: 'The props',
      default: [],
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
    let nameArray = this.name.split('/');
    var name = _.upperFirst(last(nameArray));
    nameArray[nameArray.length - 1] = name;
    var fileName = nameArray.join('/');

    this.fs.copyTpl(
      this.templatePath('handler.js'),
      this.destinationPath('handlers/' + fileName + '/index.js'),
      {RouteName: name, props: this.props}
    );
    this.fs.copyTpl(
      this.templatePath('styles.css'),
      this.destinationPath('handlers/' + fileName + '/styles.css'),
      {RouteName: name}
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
