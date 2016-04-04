/** @flow */

require('./styles.css');

import React, { Component, PropTypes } from 'react';

class <%= ComponentName %> extends Component {

  render(): ?ReactElement {
    return (
      <div className="<%= ComponentName %>">
        <%= ComponentName %>
      </div>
    );
  }

  static displayName = '<%= ComponentName %>';

  static propTypes = {
    // id: PropTypes.any.isRequired,
<% props.forEach(function(prop, index) { var propData = prop.split(':');  %>    <%= propData[0] %>: PropTypes.<%= propData[1] %><%= propData.length === 3 ? '.isRequired' : '' %>,
<% }); %>  };

}

export default <%= ComponentName %>;
