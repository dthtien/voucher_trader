import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import {toast} from 'react-toastify';

class VerifyOtpForm extends Component {
  constructor(props){
    super(props)

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
      error: '',
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
    const {otp, error} = this.state;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p className="text-danger">
          {error}
        </p>
        <TextFieldGroup 
          type='text'
          name='otp'
          value={otp}
          handleChange={this.handleChange}
          label="OTP"
        />
        <div className="text-center">
          <button className="btn btn-red">
            Xác nhận
          </button>
        </div>
      </form>
    );
  }
}

export default VerifyOtpForm;
