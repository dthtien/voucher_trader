import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';
import '../resources/App.css';
import Vouchers from '../components/vouchers/Vouchers';
import NewVoucherPage from '../components/vouchers/NewVoucherPage';
import VoucherShow from '../components/vouchers/VoucherShow';
import Message from '../components/Message';
import SignupPage from '../components/users/SignupPage';
import FlashMessagesList from '../components/shared/FlashMessagesList';
import Header from '../components/shared/Header';
import MapCotainer from '../components/map/MapContainer';
import LoginPage from '../components/users/LoginPage';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <FlashMessagesList />
        <Switch>
          <Route exact path='/' component={Vouchers} />
          <Route exact path='/vouchers/new' component={NewVoucherPage} />
          <Route path='/vouchers/:id' component={VoucherShow} />
          <Route path='/messages' component={Message}/>
          <Route path='/signup' component={SignupPage}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/vouchers' component={MapCotainer}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
