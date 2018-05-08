import React, {Component} from 'react';
import Moment from 'react-moment';


class VoucherContent extends Component {
  render(){
    const {voucher, store } = this.props;

    return(
      <div className="voucher-content">
        <h6 className="voucher-name">
          {voucher.name}
        </h6>
        <p className="store-name text-success">{store.name}</p>
        <a className="text-danger">
          Ngày hết hạn: 
          <Moment format=" DD-MM-YYYY">{voucher.date_end}</Moment>
        </a>
      </div>
    );
  }
}
export default VoucherContent;