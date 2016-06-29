import defaultState from 'store/defaultState';
import * as <%= actionFile %> from '<%= actionFile %>';

export default function <%= toFunc(name) %>(state = defaultState.<%= toFunc(name) %>, action) {
  switch (action.type) {<% actions.forEach(function(action) { %>
  case <%= actionFile %>.<%= toConst(action) %>:
    return action.payload;<% }); %>
  default:
    return state;
  }
}
