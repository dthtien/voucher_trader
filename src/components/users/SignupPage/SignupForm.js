import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputSignupForm from './InputSignupForm';
import { signupValidation } from '../../../validates';

export default class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      error: {},
      isLoading: false
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

  }

  isValid = () => {
    const {errors, isValid } = signupValidation(this.state);
    console.log(errors);
    if (!isValid) {
      this.setState({ error: errors });
    }

    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.isValid()) {   
      this.setState({ 
        error: {},
        isLoading: true
      });

      this.props.signup(this.state)
        .then( response => {
          console.log(response); })
        .catch(error => {
          console.log(error.response);
          this.setState({
            error: error.response.data.error, 
            isLoading: false
          });
        })
    }
  }

  render(){
    const error = this.state.error

    return(
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <InputSignupForm 
            type='text'
            name='email'
            value={this.state.email}
            error={error}
            handleChange={this.handleChange}
          />

          <InputSignupForm 
            type='password'
            name='password'
            value={this.state.password}
            error={error}
            handleChange={this.handleChange}
          />
          
          <InputSignupForm 
            type='password'
            name='password_confirmation'
            value={this.state.password_confirmation}
            error={error}
            handleChange={this.handleChange}
          />
          <button disabled={this.state.isLoading} className='btn btn-primary'>Signup </button>

        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired
}