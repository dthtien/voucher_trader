import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class GoogleLoginButton extends Component {
  handleGoogleResponse = (response) => {
    this.props.handleResponse(response)
  }
  render() {
    return (
      <GoogleLogin
        clientId="964968693621-oue2q6kupinhhopegvrbhf658ccr67a0.apps.googleusercontent.com"
        buttonText="Login with google"
        className="btn btn-ptc waves-effect waves-light red socialButton"
        onSuccess={this.handleGoogleResponse}
        onFailure={this.handleGoogleResponse}
      />
    );
  }
}

export default GoogleLoginButton;
