import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider } from 'mobx-react';
import App from '../shared';

export default function ({ url, context, store }) {
  return (
    <Provider store={store} >
      <StaticRouter
        location={url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>
  );
}
