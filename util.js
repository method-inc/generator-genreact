// source from https://github.com/yeoman/generator-backbone/blob/master/util.js
'use strict';
var path = require('path');
var fs = require('fs');
var recast = require('recast');

var cjsrequire = require('./transformers/cjsrequire');

function insertAt(obj, prop, index, thing) {
  var start = obj[prop].slice(0, index);
  var end = obj[prop].slice(index);
  obj[prop] = start.concat(thing).concat(end);
};

function transform(args) {
  var ast = recast.parse(args.source);
  var requireHandler = cjsrequire(args.transform.route, args.transform.route + 'Handler');
  var appendedRequire = false;
  recast.visit(ast, {
    findProgram: function(path) {
      while (path.value.type !== 'Program') {
        path = path.parent;
      }
      return path;
    },

    visitCallExpression: function(path) {
      var node = path.value;
      this.traverse(path);

      if (node.callee.name === 'require' && !appendedRequire) {
        appendedRequire = true;
        var program = this.findProgram(path);
        insertAt(program.value, 'body', 2, requireHandler);
      }
    }
    // TODO: visit Base Route and append to it.
  });

  var result = recast.print(ast).code;

  console.log(result);
  return result;
};

function transformFile(args) {
  args.path = args.path || process.cwd();
  var fullPath = path.join(args.path, args.file);

  args.source = fs.readFileSync(fullPath, 'utf8');
  var body = transform(args);

  fs.writeFileSync(fullPath, body);
}

module.exports = {
  transform: transform,
  transformFile: transformFile
};
