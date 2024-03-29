import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';
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
import Cart from '../components/Cart';
import VerifyOtpPage from '../components/users/VerifyOtpPage';
import UpdatePhoneNumberPage from '../components/users/UpdatePhoneNumberPage';
import CheckoutPage from '../components/checkouts/CheckoutPage';
import CheckoutResultPage from '../components/checkouts/CheckoutResultPage';
import ShippingPage from '../components/ShippingPage';
import EditVoucherPage from'../components/vouchers/EditVoucherPage';
import PolicyPage from '../components/PolicyPage';
import MapContainer from '../components/map/MapContainer';
import CartShowPage from '../components/CartShowPage';
import ForgotPasswordPage from '../components/users/ForgotPasswordPage';
import ResetPasswordPage from '../components/users/ResetPasswordPage';
import ChangePasswordPage from '../components/users/ChangePasswordPage';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <FlashMessagesList />
        <div className="main">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/messages' component={Message}/>
            <Route path='/signup' component={SignupPage}/>
            <Route path='/verify' component={VerifyOtpPage}/>
            <Route path='/policy' component={PolicyPage}/>
            <Route path='/shipping' component={ShippingPage}/>
            <Route exact path='/checkout' component={CheckoutPage}/>
            <Route exact path='/vouchers' component={Vouchers}/>
            <Route exact path='/vouchers/new' component={NewVoucherPage} />
            <Route path='/checkout/result' component={CheckoutResultPage}/>
            <Route path='/vouchers/:id/edit' component={EditVoucherPage} />
            <Route path='/vouchers/:id' component={VoucherShow} />
            <Route 
              path='/users/update_phone_number' 
              component={UpdatePhoneNumberPage}
            />
            <Route 
              path='/users/forgot_password' 
              component={ForgotPasswordPage}
            />
            <Route 
              path='/users/reset_password' 
              component={ResetPasswordPage}
            />
            <Route 
              path='/users/change_password' 
              component={ChangePasswordPage}
            />
            <Route path='/login' component={LoginPage}/>
            <Route path='/vouchers' component={MapCotainer}/>
            <Route path='/profile/:id' component={ProfilePage}/>
            <Route exact path='/cart' component={Cart}/>
            <Route path='/carts/:id' component={CartShowPage}/>
            <Route path='/nearby' component={MapContainer}/>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
