import React, { Component }from 'react';
import { connect } from 'react-redux'; 
import LoginForm from './LoginForm';
import {login, loggedIn} from '../../../actions/user';
import { addFlashMessage } from '../../../actions/message';

class LoginPage extends Component {
  render(){
    return(
      <div className='row'>
        <div className='col-md-4 offset-md-4'>
          <h4 className="text-center m-2">Welcome!</h4>

          <LoginForm 
            login={this.props.login}
            loggedIn={this.props.loggedIn}
            addFlashMessage={this.props.addFlashMessage}
          />
        </div>
      </div> 
    );
  }
}

export default connect (null, {login,loggedIn, addFlashMessage})(LoginPage)