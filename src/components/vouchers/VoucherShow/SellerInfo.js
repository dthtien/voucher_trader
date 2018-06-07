import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Rating from 'react-rating';


class SellerInfo extends Component {
  static propTypes = {
    seller: PropTypes.object,
  };
  state = {
    initialRating : this.props.initialRating || 0
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.initialRating){
      this.setState({ initialRating : nextProps.initialRating });
    }
  }
  render() {
    const {seller} = this.props;
    const seller_id = seller.id;
    console.log(seller);
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
        <Link to={`/profile/${seller_id}`}>
          <p className="text-center">
            <Rating
              initialRating={seller.feedback_score}
              emptySymbol="fa fa-star-o"
              fullSymbol="fa fa-star"
              fractions={2}
              readonly={true}
            />
          </p>
          <p className='font-weight-bold text-center'>
            {seller.name}
          </p>
        </Link>

      </div>
    );
  }
}

export default SellerInfo;
