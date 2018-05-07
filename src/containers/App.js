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
import ProfilePage from '../components/users/ProfilePage/';
import FlashMessagesList from '../components/shared/FlashMessagesList';
import Header from '../components/shared/Header';
import Footer from '../components/Footer';
import MapCotainer from '../components/map/MapContainer';
import LoginPage from '../components/users/LoginPage';
import Home from '../components/Home';
import SocialButton from '../components/users/SocialButton';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <FlashMessagesList />
        <div className="main">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/vouchers' component={Vouchers}/>
            <Route exact path='/vouchers/new' component={NewVoucherPage} />
            <Route path='/vouchers/:id' component={VoucherShow} />
            <Route path='/messages' component={Message}/>
            <Route path='/signup' component={SignupPage}/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/vouchers' component={MapCotainer}/>
            <Route path='/social' component={SocialButton}/>
            <Route path='/profile/:id' component={ProfilePage}/>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
