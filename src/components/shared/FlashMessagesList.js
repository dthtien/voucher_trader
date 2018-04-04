import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';
import {deleteFlashMessage} from '../../actions/message';

class FlashMessagesList extends Component{
  static propTypes = {
    messages: PropTypes.array.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
  }

  render() {
    const messages = this.props.messages.map(message => 
      <FlashMessage 
        key={message.id} 
        message={message}
        deleteFlashMessage={this.props.deleteFlashMessage} />
    );

    return(
      <div>
        {messages}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);
