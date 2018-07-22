import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import {toast} from 'react-toastify';
import qs from 'querystringify';
import isEmpty from 'lodash/isEmpty';

class ResetPasswordForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      password: '',
      password_confirmation: '',
      reset_password_token: '', 
      error: ''
    }
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount(){
    const query = qs.parse(this.context.router.route.location.search)
    console.log(query)
    this.setState({
      ...this.state,
      reset_password_token: query.reset_password_token
    })
  }
  

  handleChange = (e) => {
    this.setState({ 
      error: '',
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.validPassword()) {
      return;
    } else{
      this.props.resetPassword(this.state)
      .then(response => {
        toast.success("Đổi mật khẩu thành công thành công!")
        this.props.loggedIn(response.data.access_token);
        this.context.router.history.push('/');
      })
      .catch(error => {
        this.setState({
          ...this.state,
          error: error.response.data.message
        })
      })
    }

  }

  validPassword = () => {
    const {password_confirmation, password} = this.state;

    if (isEmpty(password) || isEmpty(password_confirmation)) {
      this.setState({
        ...this.state,
        error: 'Trường không được để trống'
      })
      return false
    }

    if (password_confirmation !== password) {
      this.setState({
        ...this.state,
        error: 'Mật khẩu khẩu không khớp'
      })

      return false
    }

    return true;
  }

  render() {
    const {password, password_confirmation, error} = this.state;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextFieldGroup 
          type='password'
          name='password'
          value={password}
          handleChange={this.handleChange}
          label="Mật khẩu mới"
        />
        <TextFieldGroup 
          type='password'
          name='password_confirmation'
          value={password_confirmation}
          handleChange={this.handleChange}
          label="Nhập lại mật khẩu"
        />

        <div className="text-center">
          <p className="text-danger">
            {error}
          </p>
          <button className="btn btn-red">
            Xác nhận
          </button>
        </div>
      </form>
    );
  }
}

export default ResetPasswordForm;
