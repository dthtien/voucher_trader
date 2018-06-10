import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookLoginButton extends Component {
  handleFacebookResponse = (response) => {
    this.props.handleResponse(response)
  }

  render() {
    return (
      <FacebookLogin
        appId="1226403430790462"
        textButton="Đăng nhâp (Đăng ký) bằng Facebook"
        autoLoad={false}
        cssClass='btn btn-ptc waves-effect waves-light bg-primary socialButton'
        scope="public_profile,user_friends"
        fields="name,email,picture"
        callback={this.handleFacebookResponse} />
    );
  }
}

export default FacebookLoginButton;
