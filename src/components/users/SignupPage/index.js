import React, { Component } from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { signup } from '../../../actions/user';

class SignupPage extends Component {
  render(){
    const error = (this.props.error) ? this.props.data : {}

    return(
      <div className="container">
        <h1 className="text-center mt-2">Join our community!</h1>
        <SignupForm signup={this.props.signup} />
      </div>
    );
  }
}

export default connect(null, {signup: signup})(SignupPage);