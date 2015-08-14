require('isomorphic-fetch');

import React from 'react';
import Router from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';

import routes from '../routes';

React.render(
  <Router history={BrowserHistory} children={routes} />,
  document.getElementById('app')
);

// clean up the __resolver__ rehydration script
(function() {
  var tmp = document.getElementById('__resolver__');
  if (tmp) {
    Object.keys(window.__resolver__).forEach(
      key => delete window.__resolver__[key]
    );
    tmp.parentNode.removeChild(tmp);
  }
})();

