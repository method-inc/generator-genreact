import React from 'react';
import {Resolver} from 'react-resolver';

class <%= RouteName %> extends React.Component {
  render(): ?ReactElement {
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
      return PromiseStore.find(this.getParams().id);
    }
    */
  },
});
