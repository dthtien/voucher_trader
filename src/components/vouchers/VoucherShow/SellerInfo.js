import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';


class SellerInfo extends Component {
  static propTypes = {
    seller: PropTypes.object,
  };
  state = {
    initialRating : this.props.initialRating || 3.5
  }
  render() {
    return (
      <div className="seller-infor mt-3 text-warning">
        <Rating
          initialRating={this.state.initialRating}
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
          fractions={2}
          readonly={this.props.readonly}
          onChange={(value) =>{
            this.setState({initialRating : value});
            if(typeof this.props.onRating === 'function'){
              this.props.onRating(value);
            }
          }}
        />
        <p className="font-weight-bold">Đánh giá : {this.state.initialRating} sao</p>
      </div>
    );
  }
}

export default SellerInfo;
