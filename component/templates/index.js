/** @flow */

require('./styles.css');

import React from 'react';

class <%= ComponentName %> extends React.Component {
  render(): ?ReactElement {
    return (
      <div className="<%= ComponentName %>">
        <%= ComponentName %>
      </div>
    );
  }
}

export default <%= ComponentName %>;
