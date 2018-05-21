import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import LoginForm from './LoginForm';
import {login, loggedIn, facebookLogin} from '../../../actions/user';
import { toast } from 'react-toastify';
import { fetchCart, unifyCart } from '../../../actions/cart';

class LoginPage extends Component {
  componentDidMount(){
    if (this.props.isAuthenticate) {
      toast.warning("Bạn đã có tài khoản");
      this.props.history.goBack();
    }
  }

  render(){
    return(
      <div className='row'>
        <div className='col-md-4 offset-md-4'>
          <h4 className="text-center m-2">Welcome!</h4>

          <LoginForm 
            login={this.props.login}
            loggedIn={this.props.loggedIn}
            fetchCart={this.props.fetchCart}
            addFlashMessage={this.props.addFlashMessage}
            facebookLogin={this.props.facebookLogin}
            unifyCart={this.props.unifyCart}
          />
        </div>
      </div> 
    );
  }
}

const mapStateToProps = (state) =>({
  isAuthenticate: state.users.isAuthenticate
})

export default connect (mapStateToProps, 

  { login, loggedIn, facebookLogin , fetchCart , unifyCart })
(LoginPage)