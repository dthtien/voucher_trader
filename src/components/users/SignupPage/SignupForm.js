import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import { signupValidation } from '../../../validates';
import SocialButton from '../SocialButton';
import {toast} from 'react-toastify'

export default class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      phone_number: '',
      name: '',
      address: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: {},
      date_of_birth: {},
      isLoading: false
    }
  }

  static contextTypes = {
    router: PropTypes.object
  };

  static propTypes = {
    signup: PropTypes.func.isRequired,
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

  // Handle date fields change
  handleDateFieldChange = (value, field) => {
    console.log(value, field);

    this.setState({
      ...this.state,
      error: {
        ...this.state.error,
        [field]: ''
      },
      [field]: value
    });
  }
// end

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.isValid()) {   
      this.setState({ 
        error: {},
        isLoading: true
      });

      this.props.signup(this.state)
        .then( response => {
          toast.success('Đăng ký thành công! Mời bạn xác nhận số điện thoai');
          this.props.loggedIn(response.data.access_token);
          this.context.router.history.push('/verify');
        })
        .catch(error => {
          this.setState({
            error: error.response.data.error, 
            isLoading: false
          });
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
          <div className='row'>
            <div className='col col-sm-12 col-md-6'>
              <TextFieldGroup 
                type='text'
                name='name'
                value={this.state.name}
                error={error.name}
                handleChange={this.handleChange}
                label="Tên"
              />              
            </div>
            <div className='col col-sm-12 col-md-6'>
              <TextFieldGroup 
                type='text'
                name='email'
                value={this.state.email}
                error={error.email}
                handleChange={this.handleChange}
                label="Email"
              />
            </div>
          </div>
          <TextFieldGroup 
            type='number'
            name='phone_number'
            value={this.state.phone_number}
            error={error.phone_number}
            handleChange={this.handleChange}
            label="Số điện thoại"
          />

          <TextFieldGroup
            name='date_of_birth'
            error={error.date_of_birth}
            type='datepicker'
            label="Ngày sinh"
            value={this.state.date_of_birth}
            handleChange={this.handleDateFieldChange}
          />
          <TextFieldGroup 
            type='password'
            name='password'
            value={this.state.password}
            error={error.password}
            handleChange={this.handleChange}
            label="Mật khẩu"
          />
          
          <TextFieldGroup 
            type='password'
            name='password_confirmation'
            value={this.state.password_confirmation}
            error={error.password_confirmation}
            handleChange={this.handleChange}
            label="Nhập lại mật khẩu"
          />

          <SocialButton facebookLogin={this.handleFacebookResonse} />
          
          <div className='text-center'>
            <button disabled={this.state.isLoading} className='btn btn-primary'>Signup </button>
          </div>

        </form>
      </div>
    );
  }
}