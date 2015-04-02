/** @flow */

require('./styles.css')

var React = require('react');

var <%= ComponentName %> = React.createClass({
  render(): ?ReactElement {
    return (
      <div className="<%= ComponentName %>">
        <%= ComponentName %>
      </div>
    );
  }
});

module.exports = <%= ComponentName %>;

