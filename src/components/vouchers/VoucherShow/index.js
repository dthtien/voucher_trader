import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../../resources/voucherShow.scss'
import ImageSlider from './ImageSlider';
import VoucherShowContent from './VoucherShowContent';
import StoreContent from './StoreContent';
import SellerInfo from './SellerInfo';
import { getVoucher, deleteVoucher } from '../../../actions/voucher';
import isEmpty from 'lodash/isEmpty';


class VoucherShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount(){
    const id = this.props.match.params.id;
    this.props.getVoucher(id);
  };

  handleFeedBack = (id) =>{
    console.log(id);
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
            <SellerInfo handleFeedBack={this.handleFeedBack} />
          </div>
        </div>
      );
    }
  }

  deleteVoucher = () => {
    const id = this.props.match.params.id;
    this.props.deleteVoucher(id, () => {
      this.context.router.history.push('/')
    });
  }

  render(){
    const {voucher} = this.props
    return(
      <div className="container voucher-show">
        {this.renderVoucherContent()}
      </div>
    );
  } 
}

const mapStateToProps = state => ({
  voucher: state.vouchers.voucher,
  loading: state.vouchers.loading,
  user: state.users.currentUser,
});

export default connect(mapStateToProps, 
  {
    getVoucher: getVoucher, 
    deleteVoucher: deleteVoucher
  })(VoucherShow);