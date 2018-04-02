import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/user';
import {reduxForm, Field} from 'redux-form';
import axios from 'axios'

class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });

  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:6060/api/v1/users/signup', {user: this.state})
      .then( response => {
        console.log(response); })
      .catch(error => {
        console.log(error.response);
      })

  }

  render(){
    return(
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1 className="text-center mt-2">Join our community!</h1>
          <div className='form-group'>
            <label className='control-label'> Email </label>
            <input 
              onChange={this.handleChange.bind(this)}
              type='text'
              value={this.state.email}
              name='email'
              className='form-control'/>
          </div>
          <div className='form-group'>
            <label className='control-label'> Password </label>
            <input 
              value={this.state.password}
              onChange={this.handleChange.bind(this)}
              type='password'
              name='password'
              className='form-control'/>
          </div>
          <div className='form-group'>
            <label className='control-label'> Password Confirmation </label>
            <input 
              onChange={this.handleChange.bind(this)}
              value={this.state.password_confirmation}
              type='password'
              name='password_confirmation'
              className='form-control' />
          </div>

          <button className='btn btn-primary'>Signup </button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  loading: state.users.loading
});

export default connect(null, {signup: signup})(SignupForm);