import React, { Component } from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { signup, loggedIn, facebookLogin} from '../../../actions/user';
import {toast} from 'react-toastify';

class SignupPage extends Component {
  componentDidMount(){
    this.handleWhenLoggedIn(this.props);
  }

  handleWhenLoggedIn = (data) => {
    if (data.isAuthenticate) {
      toast.warning('Bạn đã có tài khoản');      
      this.props.history.goBack();
    }
  }
  
  render(){
    return(
      <div className='row'>
        <div className="col-md-4 offset-md-4">
          <h1 className="text-center mt-2 font-weight-bold mb-2">
            Mời bạn đăng ký!
          </h1>
          <SignupForm 
            signup={this.props.signup}
            addFlashMessage={this.props.addFlashMessage}
            loggedIn={this.props.loggedIn}
            facebookLogin={this.props.facebookLogin}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  isAuthenticate: state.users.isAuthenticate
})

export default connect(mapStateToProps, {
  signup: signup,
  loggedIn: loggedIn,
  facebookLogin
})(SignupPage);