import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';

class VerifyOtpForm extends Component {
  constructor(props){
    super(props)

    console.log('props', this.props);

    this.state = {
      otp: '',
      phone_number: props.phoneNumber
    }
  }
  static contextTypes = {
    router: PropTypes.object
  };

  handleChange = (e) => {
    this.setState({ 
      error: {
        ...this.state.error,
        [e.target.name]: ''
      },
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.verify(this.state)
    .then(response => {
      console.log(response);
      this.props.loggedIn(response.data.access_token);
      this.context.router.history.push('/');
    })
    .catch(error => {
      console.log(error.response)
    })
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextFieldGroup 
          type='text'
          name='otp'
          value={this.state.otp}
          handleChange={this.handleChange}
          label="OTP"
        />

        <button className="btn btn-primary">
          Xác nhận
        </button>
      </form>
    );
  }
}

export default VerifyOtpForm;
