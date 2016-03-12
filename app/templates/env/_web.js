require('isomorphic-fetch');
require('es6-promise').polyfill();

import React             from 'react';
import { render }        from 'react-dom';
import { Router }        from 'react-router';
import { createHistory } from 'history'
import routes            from '../routes';

const history = createHistory();

document.getElementById('__resolver__');

render(
  <Router children={routes} history={history} />,
  document.getElementById('app')
);

// clean up the __resolver__ rehydration script
// (function() {
//   var tmp = document.getElementById('__resolver__');
//   if (tmp) {
//     Object.keys(window.__resolver__).forEach(
//       key => delete window.__resolver__[key]
//     );
//     tmp.parentNode.removeChild(tmp);
//   }
// })();
