import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
  }

  onClick = (e) => {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render(){
    const {id, type, text} = this.props.message;
    return(
      <div className={classnames('alert fade show', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })} role="alert" key={id}>
        <strong>{text}</strong>
        <button onClick={this.onClick.bind(this)} type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
    
  }
}

export default FlashMessage;