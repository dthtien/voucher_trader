import React, { Component } from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { signup, loggedIn } from '../../../actions/user';
import { addFlashMessage } from '../../../actions/message';


class SignupPage extends Component {
  render(){
    return(
      <div className='row'>
        <div className="col-md-4 offset-md-4">
          <h1 className="text-center mt-2">Join our community!</h1>
          <SignupForm 
            signup={this.props.signup}
            addFlashMessage={this.props.addFlashMessage}
            loggedIn={this.props.loggedIn}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, {
  signup: signup,
  addFlashMessage: addFlashMessage,
  loggedIn: loggedIn
})(SignupPage);