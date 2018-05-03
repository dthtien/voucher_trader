import React, { Component } from 'react';
import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'

class SocialButton extends Component {
    handleIdentityResponse = (response) => {
      console.log(response);
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

export default SocialButton;
