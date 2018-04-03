import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

  handleSubmit = (e) => {
    e.preventDefault();
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

  render(){
    const error = this.state.error

    return(
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='form-group'>
            <label className='control-label font-weight-bold'> Email </label>
            <input 
              onChange={this.handleChange.bind(this)}
              type='text'
              value={this.state.email}
              name='email'
              className={classnames('form-control', {'is-invalid': error.email})}/>
            {error.email && <span className="text-danger">{error.email}</span>}
          </div>
          <div className='form-group'>
            <label className='control-label font-weight-bold'> Password </label>
            <input 
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
              type='password'
              name='password'
              className={classnames('form-control', {'is-invalid': error.password})}/>
              {error.password && <span className="text-danger">{error.password}</span>}
          </div>
          <div className='form-group'>
            <label className='control-label font-weight-bold'> Password Confirmation </label>
            <input 
              onChange={this.handleChange.bind(this)}
              value={this.state.password_confirmation}
              type='password'
              name='password_confirmation'
              className={classnames('form-control', {'is-invalid': error.password_confirmation})} />
              {error.password_confirmation && <span className="text-danger">{error.password_confirmation}</span>}
          </div>

          <button disabled={this.state.isLoading} className='btn btn-primary'>Signup </button>

        </form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired
}