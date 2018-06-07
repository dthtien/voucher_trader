import React, {Component} from 'react';
import Voucher from '../../vouchers/Voucher';

class SellVouchers extends Component {
  renderVoucherList = () =>{
    return this.props.vouchers.map((voucher, index) => (
      <Voucher key={index} voucher={voucher} />
    ))
  }
  render(){
    return(
      <div className="vouchers">
        <div className="row">
          {this.renderVoucherList()}
        </div>
      </div>
    );
  }
}

export default SellVouchers