import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StoreContent extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const {store} = this.props;
    return (
      <div className="row">
        <div className='col col-md-2'>
          <i className="material-icons fa-5x">store_mall_directory</i>
        </div>
        <div className='col col-md-10'>
          <h5>{store.name}</h5>
          <p>{store.address}</p>
        </div>
      </div>

    );
  }
}

export default StoreContent;
