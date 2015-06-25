/** @flow */

require('./styles.css');

import React, {Component, PropTypes} from 'react';

class <%= ComponentName %> extends Component {
  render(): ReactElement {
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
