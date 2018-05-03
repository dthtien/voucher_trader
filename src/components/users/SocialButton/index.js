import React, { Component } from 'react';
import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'
import {connect} from 'react-redux';
import {facebookLogin} from '../../../actions/user';

class SocialButton extends Component {
    handleIdentityResponse = (response) => {
      this.props.facebookLogin(response)
    }

    render() {
      return (
        <div>
          <FacebookLoginButton handleResponse={this.handleIdentityResponse} />
          <GoogleLoginButton handleResponse={this.handleIdentityResponse} />
        </div>
      );
    }
}

export default connect(null, {facebookLogin})(SocialButton);
