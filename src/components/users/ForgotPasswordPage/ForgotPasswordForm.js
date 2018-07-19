import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import {toast} from 'react-toastify';

class ForgotPasswordForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
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
    this.props.forgotPassword(this.state)
    .then(response => {
      toast.success("Bạn vui lòng kiểm tra email và làm theo hướng dẫn!")
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
    const {email, error} = this.state;
    console.log(email);
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p className="text-danger">
          {error}
        </p>
        <TextFieldGroup 
          type='text'
          name='email'
          value={this.state.email}
          handleChange={this.handleChange}
          label="Email"
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

export default ForgotPasswordForm;
