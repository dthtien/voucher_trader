import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verify, loggedIn} from '../../../actions/user';
import VerifyOtpForm from './VerifyOtpForm';

class VerifyOtpPage extends Component {
  componentDidMount(){
    if (!this.props.isAuthenticate) {
      this.props.history.push('/login')
    }

    if (this.props.currentUser.active) {
      this.props.history.push('/');
    }
  }
  render() {
    return (
      <div className='container'>
        <div className='verify-otp'>
          <h4 className="text-center title-category-voucher mb-3">
            Nhập mã OTP đã gửi về máy bạn
          </h4>
          <VerifyOtpForm 
            phoneNumber={this.props.currentUser.phone_number}
            verify={this.props.verify}
            loggedIn={this.props.loggedIn}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>(
{
  currentUser: state.users.currentUser,
  isAuthenticate: state.users.isAuthenticate
})

export default connect(mapStateToProps, {verify, loggedIn})(VerifyOtpPage);