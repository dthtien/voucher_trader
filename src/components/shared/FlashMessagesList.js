import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';

class FlashMessagesList extends Component{
  static propTypes = {
    messages: PropTypes.array.isRequired
  }

  render() {
    const messages = this.props.messages.map(message => 
      <FlashMessage key={message.id} message={message} />
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

export default connect(mapStateToProps)(FlashMessagesList);
