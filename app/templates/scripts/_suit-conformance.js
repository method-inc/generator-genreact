/*eslint no-console: 0*/
var rework = require('rework');
var conformance = require('rework-suit-conformance');
var glob = require('glob');
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

var globPath = path.join(
  __dirname,
  '..',
  '{components,handlers}',
  '**',
  '*.css'
);

var loggedNamingConventions = false;
var NAMING_CONVENTIONS_RE = /\ Please(.)*\./;

glob(globPath, function(err, files) {
  files.forEach(function (file) {
    var css = fs.readFileSync(file, 'utf-8');
    try {
      rework(css).use(conformance);
    } catch (e) {
      var message = e.message;
      var matches = message.match(NAMING_CONVENTIONS_RE);
      if (matches) {
        message = message.replace(NAMING_CONVENTIONS_RE, '');
      }

      if (!loggedNamingConventions) {
        loggedNamingConventions = true;
        console.log(matches[0].trim());
      }

      console.error(
        chalk.red('Error') + ' in ' +
        chalk.magenta(
          file.replace(
            path.join(__dirname, '..'),
            '.'
          )
        )
      );

      console.error(
        message
          .replace(/".*?"/, function(match) {
            return '"' + chalk.yellow(match.replace(/"/g, '')) + '"';
          })
      );
    }
  });
});

