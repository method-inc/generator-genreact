/** @flow */

require('./styles.css');

import React, { Component, PropTypes } from 'react';

class <%= RouteName %> extends Component {

  state = {
    msg: 'Hello World',
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
<% if (typeof props !== 'undefined'){ props.forEach(function(prop, index) { var propData = prop.split(':');  %>    <%= propData[0] %>: PropTypes.<%= propData[1] %><%= propData.length === 3 ? '.isRequired' : '' %>,
<% }); } %>  };

}

export default <%= RouteName %>;
