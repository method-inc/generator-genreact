/** @flow */
import { createAction } from 'redux-actions';
<% actions.forEach(function(action) { %>
export const <%= toConst(action) %> = '<%= toConst(action) %>';
export const <%= toFunc(action) %> = createAction(<%= toConst(action) %>);
<% }); %>
