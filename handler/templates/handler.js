/** @flow */
import React, {Component} from 'react';
import {Resolver} from 'react-resolver';
import api from 'api';

class <%= RouteName %> extends Component {
  render(): ReactElement {
    return (
      <div className="<%= RouteName %>">
        <%= RouteName %>
      </div>
    );
  }
}

<%= RouteName %>.propTypes = {
  // promise: React.PropTypes.string.isRequired,
};

<%= RouteName %>.displayName = '<%= RouteName %>';

export default Resolver.createContainer(<%= RouteName %>, {
  resolve: {
    /*
    promise() {
      return api.get(this.getParams().id);
    }
    */
  },
});
