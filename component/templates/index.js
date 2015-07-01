/** @flow */

// weird destructuring to handle server rendering
import _styles from './styles.css';
var styles = _styles.locals ? _styles.locals : _styles;

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
