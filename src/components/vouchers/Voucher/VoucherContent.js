import React, {Component} from 'react';
import VoucherType from '../shared/VoucherType';

class VoucherContent extends Component {
  render(){
    const {voucher, store } = this.props;

    return(
      <div className="voucher-content">
        <h5 className="font-weight-bold">
          {voucher.name}
          <VoucherType kind={voucher.kind}/>
        </h5>
        <p className="store-name">{store.name}</p>
        <p className='text-danger font-weight-bold'>{voucher.price} VND</p>
      </div>
    );
  }
}
export default VoucherContent;