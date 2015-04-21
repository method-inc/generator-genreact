/**
 * Node/io.js and the web are both compilation targets.
 * This is a list of node_modules that webpack should
 * pipe through it’s loaders system when creating the
 * server build.
 **/

var WHITE_LIST_OF_NODE_MODULES = [
  'react-autodoc',
  'react-router',
];

module.exports = WHITE_LIST_OF_NODE_MODULES;

