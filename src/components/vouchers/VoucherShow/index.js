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
import TextFieldGroup from '../../shared/TextFieldGroup';
import CartItemForVoucher from '../../Cart/CartItemForVoucher';
import { Container, Button, Modal, ModalBody, ModalHeader } from 'mdbreact';
import '../../../resources/voucherShow.scss'



class VoucherShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    modal: {
      isOpen : false,
      type : '',
    },
    rating_note: '',
    ratingValue : null,
  }

  componentWillMount(){
    const id = this.props.match.params.id;
    this.props.getVoucher(id);
  };

  toggle = (obj) => {
    const type = obj.type || '';
    const messageModal = obj.messageModal || '';
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
      return (<h4>Loading...</h4>);
    } else {
      const { modal } = this.state;
      return (
        <div className="row">
          <div className="col col-md-5">
            <ImageSlider images={voucher.images} />
            <StoreContent store={voucher.store} />
          </div>
          <div className="col col-md-7">
            <VoucherShowContent voucher={voucher}/>
            <SellerInfo onRating={(value)=>{
              this.setState({ ratingValue : value , modal : { isOpen: true, type : 'rate' } });
            }}/>
            <CartItemForVoucher productQuantity={1} onAddItemToCart= {this._onAddCart}/>
          </div>
          <Container>
            <Modal isOpen={modal.isOpen} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>
               {
                 modal.type === 'rate' 
                 ? 'Đánh giá của bạn'
                 : modal.type === 'notice'
                 ? 'Thông báo' : null 
               }
                
              </ModalHeader>
              <ModalBody>
                {
                  this.state.messageModal && 
                  <h3 style={{color: 'red'}}>{this.state.messageModal}</h3>
                }
                {  modal.type === 'rate' &&
                  <div>
                    <h3>Bạn đã đánh giá {this.state.ratingValue} sao !</h3>
                    <TextFieldGroup 
                      type='text'
                      name='rating_note'
                      value={this.state.rating_note}
                      handleChange={(e) =>{
                        const rating_note = e.target.value;
                        this.setState({ rating_note });
                      }}
                      label="Ý kiến đánh giá"
                    />
                  </div>
                }
              </ModalBody>
              <div>
                <Button color="danger" onClick={this.toggle}>Đóng</Button>
                {
                  modal.type === 'rate' &&
                  <Button color="success" onClick={this._onRatingHandler}>Đánh giá</Button>
                }
              </div>
            </Modal>
          </Container>
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
      voucher_id : match.params.id,
      kind,
    };
    if(!params.note){
      alert('Vui lòng nhập ý kiến');
      return;
    }
    // this.setState({
    //   rating_note: '',
    //   ratingValue: 3.5,
    //   modal: false,
    // });
    this.props.rating(params).then(result =>{
      if(result.error){
        this.setState({
          ...this.state,
          messageModal: 'Đã có lỗi xảy ra !' 
        })
        return;
      }
      this.setState({
        rating_note: '',
        ratingValue: 3.5,
        modal: false,
      });
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