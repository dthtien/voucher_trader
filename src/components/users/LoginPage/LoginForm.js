import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import { loginValidation } from '../../../validates';
import SocialButton from '../SocialButton';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';

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
    const {errors, isValid } = loginValidation(this.state);
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
          toast.success('Đăng nhập thành công');
          this.props.loggedIn(response.data.access_token);
        })
        .then(() => {
          if(localStorage.getItem('cart_id')){
            this.props.unifyCart().then(result => {
              console.log("Unify cart", result)
            });
          } else {
            this.props.fetchCart();
          }
          this.context.router.history.push('/');
        })
        .catch(error => {
          console.log(error);
          this.setState({
            error: error.response.data, 
            isLoading: false
          });
          return;
        })
    }
  }

  handleFacebookResonse = (response) => {
    this.props.facebookLogin(response);
    this.context.router.history.push('/users/update_phone_number');
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
          <Link to='/users/forgot_password' className='mt-3'>
            Quên mật khẩu?
          </Link>
          <div className='text-center'>
            <button disabled={this.state.isLoading} className='btn btn-primary'> Đăng nhập </button>
          </div>

        </form>
      </div>
    );
  }
}