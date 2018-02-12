import { hydrate } from 'react-dom';
import React from 'react';
import { Provider } from 'mobx-react';
import 'es6-promise';
import 'isomorphic-fetch';
import { Router } from 'react-router-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import App from '../shared';
import Store from '../shared/store';
import { getPlayList } from '../shared/utils';
import history from './history';


const {
  playList, user, ...props
} = __SERVER__DATA__;


const newPlayList = getPlayList().concat(playList);
const store = new Store({
  playList: newPlayList, user, ...props,
});

hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('main'),
);

OfflinePluginRuntime.install();
