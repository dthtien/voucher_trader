import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import { signupValidation } from '../../../validates';
import SocialButton from '../SocialButton';

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {},
      isLoading: false
    }
  }

  static contextTypes = {
    router: PropTypes.object
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    loggedIn: PropTypes.func.isRequired
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

  isValid = () => {
    const {errors, isValid } = signupValidation(this.state);
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

      this.props.login(this.state)
        .then( response => {
          this.props.addFlashMessage({
            type: 'success',
            text: response.data.message
          });

          this.props.loggedIn(response.data.access_token);
          this.context.router.history.goBack();
        })
        .catch(error => {
          console.log(error.response);
          this.setState({
            error: error.response.data, 
            isLoading: false
          });
        })
    }
  }

  handleFacebookResonse = (response) => {
    this.props.facebookLogin(response);
    this.context.router.history.goBack();
  }
  
  render(){
    const error = this.state.error
    return(
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <TextFieldGroup 
            type='text'
            name='email'
            value={this.state.email}
            error={error.email}
            handleChange={this.handleChange}
            label="Email"
          />

          <TextFieldGroup 
            type='password'
            name='password'
            value={this.state.password}
            error={error.password}
            handleChange={this.handleChange}
            label="password"
          />
          <SocialButton facebookLogin={this.handleFacebookResonse}/>

          <div className='text-center'>
            <button disabled={this.state.isLoading} className='btn btn-primary'> Login </button>
          </div>

        </form>
      </div>
    );
  }
}