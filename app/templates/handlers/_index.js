/** @flow */
'use strict';

require('./styles.css');

import React, {Component} from 'react';

class <%= HandlerName %> extends Component {
  render(): ReactElement {
    return (
      <div>
        Welcome <%= HandlerName %>
        {this.props.children}
      </div>
    );
  }
}

export default <%= HandlerName %>;

