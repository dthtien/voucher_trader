import React, {Component} from 'react';
import { FormattedDate } from 'react-intl';
import NumberToCurrency from '../../shared/NumberToCurrency';

class VoucherContent extends Component {
  render(){
    const {voucher, store } = this.props;

    return(
      <div className="voucher-content">
        <h6 className="voucher-name">
          {`${voucher.name} `}
          <NumberToCurrency value={voucher.origin_price} />
        </h6>
        <p className="store-name text-success">
          {
            (!store) ? 
            "Không tìm thấy tên nơi áp dụng" :
            store.name
          }
        </p>
        <a className="text-dange expire-date">
          Hết hạn ngày : 
          <FormattedDate
            value={voucher.date_end || new Date()}
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