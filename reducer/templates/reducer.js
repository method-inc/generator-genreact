import defaultState from 'store/defaultState';
import {<% actions.forEach(function(action, index) { %><%= toConst(action) %><% if (index !== actions.length - 1) { %>, <% } %><% }); %>} from '<%= actionFile %>';

export default function <%= toFunc(name) %>(state = defaultState.<%= toFunc(name) %>, action) {
  switch (action.type) {<% actions.forEach(function(action) { %>
  case <%= toConst(action) %>:
    return action.payload;<% }); %>
  default:
    return state;
  }
}
