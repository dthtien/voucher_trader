import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VoucherShowContent from './VoucherShowContent';
import StoreContent from './StoreContent';
import SellerInfo from './SellerInfo';
import { getVoucher, deleteVoucher } from '../../../actions/voucher';
import { rating } from '../../../actions/user';
import { addCartItem } from '../../../actions/cart';
import ImageSlider from '../../shared/ImageSlider';
import isEmpty from 'lodash/isEmpty';
import CartItemForVoucher from '../../Cart/CartItemForVoucher';
import Spinner from '../../shared/Spinner'
import FeedbackModal from './FeedbackModal';
import '../../../resources/voucherShow.scss'

class VoucherShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props){
    super(props);

    this.state = {
      voucherId: props.match.params.id,
      modal: {
        isOpen : false,
        type : '',
      },
      rating_note: '',
      ratingValue : 0,
    }
  }


  componentWillMount(){
    const id = this.props.match.params.id;
    this.props.getVoucher(id);
  };

  onChange = (e) => {
    this.setState({
      ...this.state, 
      [e.target.name]: e.target.value 
    });
  }
  onRatingChange = (value) => {
    console.log(value);
    this.setState({
      ...this.state,
      ratingValue: value
    })
  } 

  toggle = (obj) => {
    const type = typeof obj === 'object'  && obj.type ?  obj.type : '';
    const messageModal = typeof obj === 'object'  && obj.messageModal ?  obj.messageModal : '';
    this.setState({
      modal: {
        type : type || '',
        isOpen : !this.state.modal.isOpen,
      },
      messageModal: this.state.modal.isOpen ? '' : messageModal
    });
  }

  renderVoucherContent = () => {
    const {voucher, loading } = this.props;
    if (loading || isEmpty(voucher)) {
      return (<Spinner />);
    } else {
      const { modal } = this.state;
      return (
        <div>
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-12">
              <ImageSlider images={voucher.images} />
                <StoreContent store={voucher.store} />
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <VoucherShowContent voucher={voucher}/>
              <CartItemForVoucher productQuantity={1} onAddItemToCart= {this._onAddCart}/>
            </div>
          </div>
          <SellerInfo 
            voucherId={this.state.voucherId}
            initialRating={voucher.feedback_score}
            seller={voucher.seller}
            feedbacksCount={voucher.number_of_feedbacks}
            onRating={(e)=>{
              this.setState({ 
                ...this.state,
                modal : { isOpen: true, type : 'rate' } });
              }}
            />
            
          <FeedbackModal 
            modal={modal} 
            options={this.state}
            toggle={this.toggle}
            onRatingChange={this.onRatingChange}
            onChange={this.onChange}
            _onRatingHandler={this._onRatingHandler}
          />
        </div>
      );
    }
  }
  _onRatingHandler = (obj) =>{
    const { ratingValue, rating_note } = this.state;
    const { match } = this.props;
    let kind = '';

    if(ratingValue < 3){
      kind = 'negative'
    } else if(ratingValue >= 3 && ratingValue <= 4){
      kind = 'neutral';
    } else if(ratingValue >= 4.5 && ratingValue <=5){
      kind = 'positive';
    }
    const params = {
      note : rating_note,
      score: ratingValue,
      voucher_id : match.params.id,
      kind: kind,
    };
    if(!params.note){
      alert('Vui lòng nhập ý kiến');
      return;
    }
    this.props.rating(params).then(result =>{
      if(result.error){
        this.setState({
          ...this.state,
          ratingValue: ratingValue,
          messageModal: 'Đã có lỗi xảy ra !' 
        })
        return;
      }

      this.setState({
        rating_note: '',
        ratingValue: 3.5,
        modal: false,
      });

      window.location.reload();
    });

  }
  _onAddCart = ({quantity}) => {
    const { voucher, user } = this.props;
    const cartItem = {
      ...voucher,
      quantity,
    };
    this.props.addCartItem(user,cartItem).then(result => {
      if(result.cartItem){
       this.toggle({type: 'notice', messageModal: 'Thêm giỏ hàng thành công'});
       return;
      } 
       this.toggle({type: 'notice', messageModal: 'Thêm giỏ hàng thất bại'});
    });
  }

  render(){
    return(
      <div className="container voucher-show">
        {this.renderVoucherContent()}
      </div>
    );
  } 
}

const mapStateToProps = state => {
  return{
   loading: state.vouchers.loading,
   voucher: state.vouchers.voucher,
   user: state.users.currentUser
  } 
};

export default connect(mapStateToProps, 
  {
    getVoucher: getVoucher, 
    deleteVoucher: deleteVoucher,
    rating: rating,
    addCartItem : addCartItem
  })(VoucherShow);