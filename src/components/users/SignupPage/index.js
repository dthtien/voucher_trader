import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { signup, loggedIn, facebookLogin} from '../../../actions/user';
import { addFlashMessage } from '../../../actions/message';


class SignupPage extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount(){
    if (this.props.isAuthenticate) {
      this.props.addFlashMessage({
        type: 'error',
        text: 'You already had an account!'
      })
      
      this.context.router.history.push('/');
    }
  }
  render(){
    return(
      <div className='row'>
        <div className="col-md-4 offset-md-4">
          <h1 className="text-center mt-2">Join our community!</h1>
          <SignupForm 
            signup={this.props.signup}
            addFlashMessage={this.props.addFlashMessage}
            loggedIn={this.props.loggedIn}
            facebookLogin={this.props.facebookLogin}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  isAuthenticate: state.users.isAuthenticate
})

export default connect(mapStateToProps, {
  signup: signup,
  addFlashMessage: addFlashMessage,
  loggedIn: loggedIn,
  facebookLogin
})(SignupPage);