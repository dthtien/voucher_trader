import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePhoneNumber, loggedIn} from '../../../actions/user';
import UpdatePhoneNumberPageForm from './UpdatePhoneNumberPageForm';

class UpdatePhoneNumberPage extends Component {
  componentDidMount(){
    console.log();
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
          <h4>Please enter your phone number code</h4>
          <UpdatePhoneNumberPageForm 
            update_phone_number={this.props.updatePhoneNumber}
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

export default connect(mapStateToProps, {updatePhoneNumber, loggedIn})(UpdatePhoneNumberPage);