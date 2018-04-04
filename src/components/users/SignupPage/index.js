import React, { Component } from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { signup } from '../../../actions/user';

class SignupPage extends Component {
  render(){
    return(
      <div className='row'>
        <div className="col-md-4 offset-md-4">
          <h1 className="text-center mt-2">Join our community!</h1>
          <SignupForm signup={this.props.signup} />
        </div>
      </div>
    );
  }
}

export default connect(null, {signup: signup})(SignupPage);