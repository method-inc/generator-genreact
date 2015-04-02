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
      default: 'app',
    });

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
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
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('_index.html'),
        this.destinationPath('index.html')
      );
      this.fs.copy(
        this.templatePath('_index.js'),
        this.destinationPath('index.js')
      );
      this.fs.copy(
        this.templatePath('_README.md'),
        this.destinationPath('README.md')
      );
      this.fs.copy(
        this.templatePath('_server.js'),
        this.destinationPath('server.js')
      );
      this.fs.copy(
        this.templatePath('_webpack.client.js'),
        this.destinationPath('webpack.client.js')
      );
      this.fs.copy(
        this.templatePath('_webpack.node.js'),
        this.destinationPath('webpack.node.js')
      );
      this.fs.copy(
        this.templatePath('scripts/_webpack.base.js'),
        this.destinationPath('scripts/webpack.base.js')
      );
      this.fs.copy(
        this.templatePath('scripts/_white-list.js'),
        this.destinationPath('scripts/white-list.js')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
