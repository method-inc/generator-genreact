require('isomorphic-fetch');
require('es6-promise').polyfill();

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createHistory } from 'history';
import routes from '../routes';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';

const history = createHistory();

// const resolverState = document.getElementById('__resolver__');

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('app');

render(
  (
    <Provider store={store}>
      <Router children={routes} history={history} />
    </Provider>
  ),
  rootElement
);

// clean up the __resolver__ & __initialState__ rehydration scripts
(function() {
  let tmp = document.getElementById('__resolver__');
  // if (tmp) {
  //   Object.keys(window.__resolver__).forEach(
  //     key => delete window.__resolver__[key]
  //   );
  //   tmp.parentNode.removeChild(tmp);
  // }

  tmp = document.getElementById('__initialState__');
  if (tmp) {
    Object.keys(window.__INITIAL_STATE__).forEach(
      key => delete window.__INITIAL_STATE__[key]
    );
    tmp.parentNode.removeChild(tmp);
  }
})();
