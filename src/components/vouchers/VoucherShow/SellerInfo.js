import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Rating from 'react-rating';
import Feedbacks from '../../Feedbacks'
import DefaultAvatar from "../../../resources/images/default_avatar.png";

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
    return (
      <div className="feedback-infor mt-3">
        <div className="row">
          <div className='col-6'>
            <div className='rating-score'>
              <Rating
                initialRating={this.state.initialRating}
                emptySymbol="fa fa-star-o fa-2x text-warning"
                fullSymbol="fa fa-star fa-2x text-warning"
                fractions={2}
                readonly={true}
              />
              <p className="font-weight-bold">
                {this.state.initialRating} / 5
                <span className='ml-2 font-weight-light'>
                  ({this.props.feedbacksCount} đánh giá)
                </span>
              </p>
              <Link to={`/profile/${seller_id}`}>
                <div className='row'>
                  <div className='col-2'>
                    <img className='img-avatar-sm' src={DefaultAvatar}/>
                  </div>
                  <div className='col-10'>
                    <p className='mr-2 font-weight-bold'>{seller.name}</p>
                    <Rating
                      initialRating={seller.feedback_score}
                      emptySymbol="fa fa-star-o"
                      fullSymbol="fa fa-star"
                      fractions={2}
                      readonly={true}
                    />
                    <span className='ml-2 font-weight-light'>
                      ({seller.number_of_feedbacks} đánh giá)
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className='col-6'>
            <button 
              onClick={this.props.onRating.bind(this)} 
              className='btn btn-red'> Đánh giá voucher
            </button>
          </div>
        </div>
        <div className='feedbacks'>
          <Feedbacks type="vouchers" recordId={this.props.voucherId} />
        </div>
      </div>
    );
  }
}

export default SellerInfo;
