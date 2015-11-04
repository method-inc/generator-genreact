/** @flow */

require('./styles.css');

import React from 'react';

class <%= RouteName %> extends React.Component {
  render(): ?ReactElement {
    return (
      <div className="<%= RouteName %>">
        <%= RouteName %>
      </div>
    );
  }
}

<%= RouteName %>.propTypes = {
  // promise: React.PropTypes.string.isRequired,
};

<%= RouteName %>.displayName = '<%= RouteName %>';

export default <%= RouteName %>;
