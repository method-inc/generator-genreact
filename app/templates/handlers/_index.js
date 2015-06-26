/** @flow */
'use strict';

require('./styles.css');

import React, {Component} from 'react';
import {RouteHandler} from 'react-router';

class <%= HandlerName %> extends Component {
  render(): ReactElement {
    return (
      <div>
        Welcome <%= HandlerName %>
        <RouteHandler />
      </div>
    );
  }
}

export default <%= HandlerName %>;

