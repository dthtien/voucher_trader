import React, { Component } from 'react';

class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
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
              name='passwordConfirmation'
              className='form-control' />
          </div>

          <button className='btn btn-primary'>Signup </button>

        </form>
      </div>
    );
  }
}

export default SignupForm;