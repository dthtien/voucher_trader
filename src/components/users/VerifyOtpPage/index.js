import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verify, loggedIn} from '../../../actions/user';
import VerifyOtpForm from './VerifyOtpForm';

class VerifyOtpPage extends Component {
  render() {
    return (
      <div className='container'>
        <div className='verify-otp'>
          <h4>Please enter your OTP code</h4>
          <VerifyOtpForm 
            phoneNumber={this.props.phoneNumber}
            verify={this.props.verify}
            loggedIn={this.props.loggedIn}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>(
{
  phoneNumber: state.users.currentUser.phone_number
})

export default connect(mapStateToProps, {verify, loggedIn})(VerifyOtpPage);
