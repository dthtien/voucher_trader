import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './containers/App';
import Vouchers from './components/Vouchers';

export default(
  <Switch>
    <Route exact path='/' component={App}/>
  </Switch>
);