import React, { Component } from 'react';
import {connect} from 'react-redux';
import ResetPasswordForm from './ResetPasswordForm';
import { resetPassword, loggedIn} from '../../../actions/user';

class ResetPasswordPage extends Component {
  render() {
    return (
      <div className='container'>
        <div className='verify-otp'>
          <h4 className="text-center title-category-voucher mb-3">
            Đổi mật khẩu
          </h4>
          <ResetPasswordForm 
            resetPassword={this.props.resetPassword}
            loggedIn={this.props.loggedIn}/>
        </div>
      </div>
    );
  }
}

export default connect(null, {resetPassword, loggedIn})(ResetPasswordPage);
