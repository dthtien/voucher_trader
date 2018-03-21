import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';
import logo from '../resources/logo.svg';
import '../resources/App.css';
import Vouchers from '../components/Vouchers';

const App = () => {
  return (
    <Router>
      <div className="APP">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Voucher Trader</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Switch>
          <Route exact path='/' component={Vouchers} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
