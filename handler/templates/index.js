var React = require('react');
var Resolver = require('react-resolver');
var RouteHandler = require('react-router').RouteHandler;

var <%= RouteName %> = React.createClass({
  mixins: [Resolver.mixin],

  statics: {
    resolve: {
      promiseStyle() {
        return PromiseStore.find(this.getParams().id);
      },
      callback(done) {
        fetch('/api/' + this.getParams().id, done);
      }
    }
  },

  render() {
    return (
      '<%= RouteName %>'
    );
  }
});

module.exports = <%= RouteName %>;

