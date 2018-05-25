import React, {Component} from 'react';
import { ToastContainer } from 'react-toastify';

class FlashMessagesList extends Component{
  render() {
    return(
      <div>
        <ToastContainer 
          autoClose={3000}
        />
      </div>
    )
  }
}

export default FlashMessagesList;
