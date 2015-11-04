/** @flow */

require('./styles.css');

import React from 'react';
var {PropTypes} = React;

class <%= ComponentName %> extends React.Component {

  static displayName = '<%= ComponentName %>'

  static propTypes = {
    // id: PropTypes.any.isRequired,
  }

  render(): ?ReactElement {
    return (
      <div className="<%= ComponentName %>">
        <%= ComponentName %>
      </div>
    );
  }
}

export default <%= ComponentName %>;
