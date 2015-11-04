/** @flow */

require('./styles.css');

import React from 'react';

class <%= RouteName %> extends React.Component {

  static displayName = '<%= RouteName %>'

  static propTypes = {
    // id: React.PropTypes.any.isRequired,
  }

  static contextTypes = {
    // router: React.PropTypes.any.isRequired,
  }

  render(): ?ReactElement {
    return (
      <div className="<%= RouteName %>">
        <%= RouteName %>
      </div>
    );
  }
}

export default <%= RouteName %>;
