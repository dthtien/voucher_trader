import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import LoginForm from './LoginForm';
import {login, loggedIn, facebookLogin} from '../../../actions/user';
import { addFlashMessage } from '../../../actions/message';

class LoginPage extends Component {
  componentDidMount(){
    if (this.props.isAuthenticate) {
      this.props.addFlashMessage({
        type: 'error',
        text: 'You already had an account!'
      })
      
      this.props.history.goBack();
    }
  }

  render(){
    return(
      <div className='row'>
        <div className='col-md-4 offset-md-4'>
          <h4 className="text-center m-2">Welcome!</h4>

          <LoginForm 
            login={this.props.login}
            loggedIn={this.props.loggedIn}
            addFlashMessage={this.props.addFlashMessage}
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

export default connect (mapStateToProps, 
  {login, loggedIn, addFlashMessage, facebookLogin})
(LoginPage)