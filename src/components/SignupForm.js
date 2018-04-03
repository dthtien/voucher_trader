import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/user';

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
    this.props.signup(this.state);
  }

  render(){
    const error = (this.props.error) ? this.props.data : {}

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

const mapStateToProps = state => ({
  data: state.users.data,
  error: state.users.error,
  accessToken: state.users.accessToken
});

export default connect(mapStateToProps, {signup: signup})(SignupForm);