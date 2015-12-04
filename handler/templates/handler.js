/** @flow */

require('./styles.css');

import React, {Component, PropTypes} from 'react';

class <%= RouteName %> extends Component {

  this.state = {
    msg: 'Hello World'
  };

  render(): ?ReactElement {
    return (
      <div className="<%= RouteName %>">
        {this.state.msg} <%= RouteName %>
      </div>
    );
  }

  static displayName = '<%= RouteName %>';

  static propTypes = {
    // id: PropTypes.any.isRequired,
  };

}

export default <%= RouteName %>;
