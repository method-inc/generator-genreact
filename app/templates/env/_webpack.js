// TODO(dlk): extract this info from webpack’s stats file
function resources() {
  if (process.env.NODE_ENV === 'development') {
    return '<script async src="//localhost:<%= hotServerPort %>/dist/client.js"></script>';
  }

  return `
    <link rel="stylesheet" href="/cdn/styles.css" />
    <script async src="/cdn/client.js"></script>
  `.trim();
}

export var resources = resources;

