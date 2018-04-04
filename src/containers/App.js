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
import Message from '../components/Message';
import SignupPage from '../components/users/SignupPage';
import FlashMessagesList from '../components/shared/FlashMessagesList';
import LoginPage from '../components/users/LoginPage';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toTitlelize= function(){
  return this.capitalize().split('_').join(' ');
}

const App = () => {
  return (
    <Router>
      <div className="APP">
        <header className="App-header text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Voucher Trader</h1>
        </header>
        <FlashMessagesList />
        <Switch>
          <Route exact path='/' component={Vouchers} />
          <Route exact path='/vouchers/new' component={NewVoucher} />
          <Route path='/vouchers/:id' component={VoucherShow} />
          <Route path='/messages' component={Message}/>
          <Route path='/signup' component={SignupPage}/>
          <Route path='/login' component={LoginPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
