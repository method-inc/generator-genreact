/** @flow */

require('./styles.css');

import React from 'react';
var {PropTypes} = React;

class <%= ComponentName %> extends React.Component {
  render(): ?ReactElement {
    return (
      <div className="<%= ComponentName %>">
        <%= ComponentName %>
      </div>
    );
  }
}

<%= ComponentName %>.propTypes = {
  id: PropTypes.any.isRequired,
};

export default <%= ComponentName %>;
