import { hydrate } from 'react-dom';
import React from 'react';
import { Provider, inject, observer } from 'mobx-react';
import 'es6-promise';
import 'isomorphic-fetch';
import { Router } from 'react-router-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import App from '../shared';
import Store from '../shared/store';
import { getPlayList } from '../shared/utils';
import history from './history';

const { playList, user, ...props } = __SERVER__DATA__;

const store = new Store({
  playList,
  user,
  ...props,
});

@inject('store')
@observer
class ClientApp extends React.Component {
  componentDidMount() {
    const newPlayList = getPlayList().concat(playList);
    this.props.store.playList = newPlayList;
  }
  render() {
    return (
      <Router history={history}>
        <App />
      </Router>
    );
  }
}

hydrate(
  <Provider store={store}>
    <ClientApp />
  </Provider>,
  document.getElementById('main'),
);

OfflinePluginRuntime.install();
