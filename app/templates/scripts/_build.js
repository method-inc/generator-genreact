var webpack = require('webpack');
var write = require('fs').writeFileSync;
var path = require('path');
var OUTPUT_STATS_FILE = path.join(__dirname, '..', 'dist', 'output.json');
var baseConfig = require('./webpack.base');

// build client code
// TODO: provide hooks for uploading to a cdn or static file
// location, or rename it to be analagous with webpack
// if (!process.env.CDN_LOCATION) {
//   throw new Error('process.env.CDN_LOCATION must be set for built files location.');
// }

console.log('Building client binding to %s', process.env.PORT);
webpack(
  baseConfig({
    // cdn: process.env.CDN_LOCATION,
    cdn: '/dist',
    hotloader: false,
    env: 'production',
    target: 'web',
    serverPort: process.env.PORT,
  })
)
.run(function(err, stats) {
  if (err) throw err;

  write(OUTPUT_STATS_FILE, JSON.stringify(stats.toJson(), null, 2), 'utf8');
});

console.log('Building server binding to %s', process.env.PORT);
// build server code
webpack(
  baseConfig({
    env: 'production',
    target: 'node',
    serverPort: process.env.PORT
  })
)
.run(function(err) {
  if (err) throw err;
});
