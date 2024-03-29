import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StoreContent extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  render() {
    const {store} = this.props;
    return (
      <div className="row store-content">
        <div className='col-lg-4 col-md-4'>
          <i className="fa fa-shopping-cart fa-4x"></i>
        </div>
        <div className='col-lg-8 col-md-8'>
          <h5>{store && store.name}</h5>
          <p>{store && store.address}</p>
        </div>
      </div>

    );
  }
}

export default StoreContent;
