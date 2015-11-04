/** @flow */
'use strict';

require('./styles.css');

import React from 'react';
import {RouteHandler} from 'react-router';

class <%= HandlerName %> extends React.Component {
  render(): ?ReactElement {
    return (
      <div className="<%= HandlerName %>">
        Welcome <%= HandlerName %>
        <RouteHandler />
      </div>
    );
  }
}

export default <%= HandlerName %>;
