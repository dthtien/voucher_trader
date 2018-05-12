import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VoucherShowContent from './VoucherShowContent';
import StoreContent from './StoreContent';
import SellerInfo from './SellerInfo';
import { getVoucher, deleteVoucher } from '../../../actions/voucher';
import { rating } from '../../../actions/user';
import ImageSlider from '../../shared/ImageSlider';
import isEmpty from 'lodash/isEmpty';
import TextFieldGroup from '../../shared/TextFieldGroup';
import { Container, Button, Modal, ModalBody, ModalHeader } from 'mdbreact';
import '../../../resources/voucherShow.scss'



class VoucherShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  state = {
    modal: false,
    rating_note: '',
    ratingValue : null,
  }

  componentWillMount(){
    const id = this.props.match.params.id;
    this.props.getVoucher(id);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  renderVoucherContent = () => {
    const {voucher, loading, match} = this.props;
    if (loading || isEmpty(voucher)) {
      return (<h4>Loading...</h4>);
    } else {
      return (
        <div className="row">
          <div className="col col-md-5">
            <ImageSlider images={voucher.images} />
            <StoreContent store={voucher.store} />
          </div>
          <div className="col col-md-7">
            <VoucherShowContent voucher={voucher}/>

            <SellerInfo onRating={(value)=>{
              this.setState({ ratingValue : value , modal : true });
            }}/>
          </div>
          <Container>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Đánh giá của bạn</ModalHeader>
              <ModalBody>
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
              </ModalBody>
              <div>
                <Button color="danger" onClick={this.toggle}>Hủy bỏ</Button>{' '}
                <Button color="success" onClick={this._onRatingHandler}>Đánh giá</Button>
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
    this.setState({
      rating_note: '',
      ratingValue: 3.5,
      modal: false,
    });
    this.props.rating(params);

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
  } 
};

export default connect(mapStateToProps, 
  {
    getVoucher: getVoucher, 
    deleteVoucher: deleteVoucher,
    rating: rating
  })(VoucherShow);