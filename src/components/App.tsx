import React, { Suspense } from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { Loading } from './Loading';
import './App.css';

const App: React.FC = ({ children }) => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Switch>{children}</Switch>
      </Suspense>
    </HashRouter>
  );
};

App.defaultProps = {};

export default App;
