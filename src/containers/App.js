import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';
import logo from '../resources/logo.svg';
import '../resources/App.css';
import Vouchers from '../components/vouchers/Vouchers';
import NewVoucher from '../components/vouchers/NewVoucher';
import VoucherShow from '../components/vouchers/VoucherShow';


const App = () => {
  return (
    <Router>
      <div className="APP">
        <header className="App-header text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Voucher Trader</h1>
        </header>
        <Switch>
          <Route exact path='/' component={Vouchers} />
          <Route exact path='/vouchers/new' component={NewVoucher} />
          <Route path='/vouchers/:id' component={VoucherShow} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
