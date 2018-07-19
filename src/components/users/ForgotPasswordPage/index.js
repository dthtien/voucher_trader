import React, { Component } from 'react';
import {connect} from 'react-redux';
import { forgotPassword} from '../../../actions/user';
import ForgotPasswordForm from './ForgotPasswordForm'

class ForgotPasswordPage extends Component {
  render() {
    return (
      <div className='container'>
        <div className='verify-otp'>
          <h4 className="text-center title-category-voucher mb-3">
            Nhập email đã đăng ký của bạn
          </h4>
          <ForgotPasswordForm 
            forgotPassword={this.props.forgotPassword}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, {forgotPassword})(ForgotPasswordPage);
