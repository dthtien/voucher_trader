import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import NumberToCurrency from '../../shared/NumberToCurrency';
import VoucherType from '../shared/VoucherType';

class VoucherShowContent extends Component {
  static propTypes = {
    voucher: PropTypes.object.isRequired,
  };

  render() {
    const { voucher } = this.props
    return (
      <div className="voucher-show-content">
        <div className="text-left row">
          <div className="col-10">
            <h3>
              {voucher.name}
              <NumberToCurrency value={voucher.price}/>
            </h3>  
          </div>
          <div className="col-2">
            <VoucherType kind={voucher.kind}/>
          </div>
        </div>
        <p className="text-danger">
          <NumberToCurrency value={voucher.price}/>
        </p>
        <blockquote>
          {voucher.kind !== 'e' && <p><strong>Địa chỉ nhận: </strong>
            {!voucher.address_receiver && "Mã gỉam gía không có địa chỉ nhận"}
            {voucher.address_receiver}
            </p>}
          <p>
            <strong>Thời gian sử dụng: </strong>
            <span className="mr-1 font-weight-bold">
              <FormattedDate
                value={voucher.date_start}
                className='ml-2'
                year='numeric'
                month='long'
                day='2-digit'
              />
            </span>
            <span> đến </span>
            <span className="ml-1 font-weight-bold">
              <FormattedDate
                value={voucher.date_end}
                className='ml-2'
                year='numeric'
                month='long'
                day='2-digit'
              />
            </span>
          </p>
          <p>
            <strong>Mô tả: </strong> 
            {voucher.description === '' && 'Mã gỉam gía không có mô tả gì thêm'}
            {voucher.description}
          </p>
          <p>
            <strong>Kho còn: </strong> 
            {voucher.quantity}
          </p>
        </blockquote>
      </div>

    );
  }
}

export default VoucherShowContent;
