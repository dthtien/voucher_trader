import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      error: {}
    }
  }

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: {} });
    console.log(this.props.signup);
    this.props.signup(this.state)
      .then( response => {
        console.log(response); })
      .catch(error => {
        console.log(error.response);
        this.setState({
          error: error.response.data.error
        });
      })
  }

  render(){
    const error = this.state.error

    return(
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='form-group'>
            <label className='control-label'> Email </label>
            <input 
              onChange={this.handleChange.bind(this)}
              type='text'
              value={this.state.email}
              name='email'
              className='form-control'/>
            {error.email && <span className="text-danger">{error.email}</span>}
          </div>
          <div className='form-group'>
            <label className='control-label'> Password </label>
            <input 
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
              type='password'
              name='password'
              className='form-control'/>
              {error.password && <span className="text-danger">{error.password}</span>}
          </div>
          <div className='form-group'>
            <label className='control-label'> Password Confirmation </label>
            <input 
              onChange={this.handleChange.bind(this)}
              value={this.state.password_confirmation}
              type='password'
              name='password_confirmation'
              className='form-control' />
              {error.password_confirmation && <span className="text-danger">{error.password_confirmation}</span>}
          </div>

          <button className='btn btn-primary'>Signup </button>

        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired
}