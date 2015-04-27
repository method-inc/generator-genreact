'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the life-changing ' + chalk.red('React') + ' generator!'
    ));

    this.argument('name', {
      required: false,
      type: String,
      desc: 'Your Isomorphic React Application’s name',
      defaults: 'Isomorphism',
    });

    this.argument('port', {
      required: false,
      type: Number,
      desc: 'Port for application to run on',
      defaults: 4000,
    });

    done();
  },

  writing: {
    app: function () {
      var name = this.name;
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {name: name}
      );
    },

    projectfiles: function () {
      var name = this.name;
      var port = this.port;
      var hotServerPort = port + 1;
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        {name: name, port: port}
      );

      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'),
        {name: name, hotServerPort: hotServerPort}
      );

      this.fs.copyTpl(
        this.templatePath('_webpack.node.js'),
        this.destinationPath('webpack.node.js'),
        {port: port}
      );

      this.fs.copyTpl(
        this.templatePath('_webpack.client.js'),
        this.destinationPath('webpack.client.js'),
        {port: port, hotServerPort: hotServerPort}
      );

      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('eslintignore'),
        this.destinationPath('.eslintignore')
      );
      this.fs.copy(
        this.templatePath('_jest-preprocessor.js'),
        this.destinationPath('jest-preprocessor.js')
      );
      this.fs.copy(
        this.templatePath('travis.yml'),
        this.destinationPath('.travis.yml')
      );
      this.fs.copy(
        this.templatePath('_index.js'),
        this.destinationPath('index.js')
      );
      this.fs.copy(
        this.templatePath('_server.js'),
        this.destinationPath('server.js')
      );
      this.fs.copy(
        this.templatePath('scripts/_webpack.base.js'),
        this.destinationPath('scripts/webpack.base.js')
      );
      this.fs.copy(
        this.templatePath('scripts/_node-white-list.js'),
        this.destinationPath('scripts/node-white-list.js')
      );

      this.fs.copyTpl(
        this.templatePath('../../handler/templates/handler.js'),
        this.destinationPath('handlers/Home/index.js'),
        {RouteName: 'Home'}
      );

      this.fs.copyTpl(
        this.templatePath('handlers/_index.js'),
        this.destinationPath('handlers/Base/index.js'),
        {HandlerName: 'AppBase'}
      );
      this.fs.copyTpl(
        this.templatePath('handlers/_styles.css'),
        this.destinationPath('handlers/Base/styles.css'),
        {HandlerName: 'AppBase'}
      );

      this.fs.copyTpl(
        this.templatePath('handlers/_index.js'),
        this.destinationPath('handlers/NotFound/index.js'),
        {HandlerName: 'NotFound'}
      );
      this.fs.copyTpl(
        this.templatePath('handlers/_styles.css'),
        this.destinationPath('handlers/NotFound/styles.css'),
        {HandlerName: 'NotFound'}
      );

      this.fs.copyTpl(
        this.templatePath('env/_node.js'),
        this.destinationPath('env/node.js'),
        {port: port}
      );
      this.fs.copy(
        this.templatePath('env/_web.js'),
        this.destinationPath('env/web.js')
      );
      this.fs.copy(
        this.templatePath('_routes.js'),
        this.destinationPath('routes.js')
      );
    },
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
    });
  },
});
