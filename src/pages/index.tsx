/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '~/store';
import bootstrap from '~/core/bootstrap';
import App from '~/components/App';
import { config } from '~/core/jssdk/wx';

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App>
        <Route path="/" component={React.lazy(() => import('~/routes/home'))} exact />
        <Route path="/certified/:code" component={React.lazy(() => import('~/routes/certified'))} />
        <Route path="/brand/:code" component={React.lazy(() => import('~/routes/brand'))} />
        <Route path="/who/:code" component={React.lazy(() => import('~/routes/who'))} />
        <Route path="/faq/:code" component={React.lazy(() => import('~/routes/faq'))} />
        <Redirect to="/" />
      </App>
    </Provider>,
    document.getElementById('react-root'),
  );
}

bootstrap()
  .then(() => render())
  .then(() => config(['scanQRCode', 'hideAllNonBaseMenuItem']));

if (module.hot) {
  module.hot.accept(() => render());
}
