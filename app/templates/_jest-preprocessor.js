var babel = require('babel-core');

module.exports = {
  process: function (src, filename) {
    var stage = 0;

    // Ignore all files within node_modules
    // babel files can be .js, .es, .jsx or .es6
    if (filename.indexOf("node_modules") === -1 && babel.canCompile(filename)) {
      return babel.transform(
        src.toString().replace(/((var|let|const)[\s]*[a-zA-Z0-9\-\_]+[\s]*=[\s]*)?require\('[a-zA-Z0-9\.\/\-\_]+\.s?css\'\);?/gm, ''),
        { filename: filename,
          stage: stage,
          retainLines: true,
          auxiliaryCommentBefore: "istanbul ignore next"
        }
      ).code;
    }

    return src;
  }
};
