import React, {Component} from 'react';
import {connect} from 'react-redux';
import Voucher from '../../vouchers/Voucher';
import { getSellingVouchers } from '../../../actions/user';
import Spinner from '../../shared/Spinner'

class SellVouchers extends Component {
  componentDidMount(){
    this.props.getSellingVouchers(this.props.profileId);
  }

  renderVoucherList = () =>{
    return this.props.vouchers.map((voucher, index) => (
      <Voucher key={index} voucher={voucher} />
    ))
  }
  render(){
    if (this.props.loading) {
      return( <Spinner />);
    } else {
      return(
        <div className="vouchers">
          <div className="row">
            {this.renderVoucherList()}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) =>({
  vouchers: state.vouchers.all,
  loading: state.vouchers.loading
})
export default connect(mapStateToProps, {getSellingVouchers})(SellVouchers);