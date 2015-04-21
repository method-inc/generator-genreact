/** @flow */
'use strict';

require('./styles.css');

import React from 'react';
import {Resolver} from 'react-resolver';
import {RouteHandler} from 'react-router';

class <%= HandlerName %> extends React.Component {
  render(): ?ReactElement {
    return (
      <div>
        Welcome <%= HandlerName %>
        <RouteHandler/>
      </div>
    );
  }
}

export default <%= HandlerName %>;

