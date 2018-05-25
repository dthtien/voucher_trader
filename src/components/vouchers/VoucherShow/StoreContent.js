import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StoreContent extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const {store} = this.props;
    return (
      <div className="row store-content">
        <div className='col-lg-4 col-md-4'>
          <i className="material-icons fa-5x">store_mall_directory</i>
        </div>
        <div className='col-lg-8 col-md-8'>
          <h5>{store.name}</h5>
          <p>{store.address}</p>
        </div>
      </div>

    );
  }
}

export default StoreContent;
