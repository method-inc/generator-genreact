/*eslint no-console: 0*/
var rework = require('rework');
var conformance = require('rework-suit-conformance');
var glob = require('glob');
var fs = require('fs');
var path = require('path');

var globPath = path.join(
  __dirname,
  '..',
  '{components,handlers}',
  '**',
  '*.css'
);

glob(globPath, function(err, files) {
  files.forEach(function (file) {
    var css = fs.readFileSync(file, 'utf-8');
    try {
      rework(css).use(conformance);
    } catch (e) {
      console.error('Error in ' + file.replace(
        path.join(__dirname, '..'),
        '.'
      ));
      console.error(e.message);
    }
  });
});

