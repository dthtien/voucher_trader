import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePassword, loggedIn} from '../../../actions/user';
import ChangePasswordForm from './ChangePasswordForm';
import {toast} from 'react-toastify';

class ChangePasswordPage extends Component {
  componentDidMount(){
    if (!this.props.isAuthenticate) {
      toast.warning('Bạn chưa đăng nhập');
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div className='container'>
        <div className='verify-otp'>
          <h4 className="text-center title-category-voucher mb-3">
            Đổi mật khẩu
          </h4>
          <ChangePasswordForm 
            changePassword={this.props.changePassword}
            loggedIn={this.props.loggedIn}/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticate: state.users.isAuthenticate
})

export default connect(mapStateToProps, {changePassword, loggedIn})(ChangePasswordPage);
