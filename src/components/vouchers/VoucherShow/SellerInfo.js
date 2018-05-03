import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';


class SellerInfo extends Component {
  static propTypes = {
    seller: PropTypes.object,
  };

  render() {
    return (
      <div className="seller-infor mt-3 text-warning">
        <Rating
          initialRating={3.5}
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
          fractions={2}
          onChange={(obj)=>{
            this.props.handleFeedBack(obj)
          }}
        />
        <p className="font-weight-bold">Name</p>
      </div>
    );
  }
}

export default SellerInfo;
