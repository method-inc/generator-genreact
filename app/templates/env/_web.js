require('isomorphic-fetch');
require('es6-promise').polyfill();

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

import routes from '../routes';

Router.run(routes, Router.HistoryLocation, function(Handler) {
  ReactDOM.render(<Handler />, document.getElementById('app'));
});

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
