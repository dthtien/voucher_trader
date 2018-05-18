import React, {Component} from 'react';
import { FormattedDate } from 'react-intl';

class VoucherContent extends Component {
  render(){
    const {voucher, store } = this.props;

    return(
      <div className="voucher-content">
        <h6 className="voucher-name">
          {voucher.name}
        </h6>
        <p className="store-name text-success">{store.name}</p>
        <a className="text-dange expire-date">
          Hết hạn ngày : 
          <FormattedDate
            value={voucher.date_end}
            className='ml-2'
            year='numeric'
            month='long'
            day='2-digit'
          />
        </a>
      </div>
    );
  }
}
export default VoucherContent;