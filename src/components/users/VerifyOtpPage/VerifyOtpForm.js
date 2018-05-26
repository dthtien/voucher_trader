import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import {toast} from 'react-toastify';

class VerifyOtpForm extends Component {
  constructor(props){
    super(props)

    console.log('props', this.props);

    this.state = {
      otp: '',
      error: ''
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
      toast.success("Xác minh thành công!")
      this.props.loggedIn(response.data.access_token);
      this.context.router.history.push('/');
    })
    .catch(error => {
      this.setState({
        ...this.state,
        error: error.response.data.message
      })
    })
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {
          this.state.error !== '' && 
          <p className="text-danger">{this.state.error}</p>
        }
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
