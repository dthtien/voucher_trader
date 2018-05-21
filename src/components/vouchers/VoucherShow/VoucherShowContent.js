import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedNumber } from 'react-intl';
import VoucherType from '../shared/VoucherType';

class VoucherShowContent extends Component {
  static propTypes = {
    voucher: PropTypes.object.isRequired,
  };

  render() {
    const { voucher } = this.props
    return (
      <div className="voucher-show-content">
        <h3 className="text-center">
          {voucher.name}
          <VoucherType kind={voucher.kind}/>
        </h3>
        <p className="text-danger">
          <FormattedNumber 
            value={voucher.price} 
            style="currency" 
            currency="VND"/>
        </p>
        <blockquote>
          {voucher.kind !== 'e' && <p><strong>Địa chỉ nhận: </strong>{voucher.address_receiver}</p>}
          <p>
            <strong>Thời gian sử dụng: </strong>
            <span className="mr-1">
              <FormattedDate
                value={voucher.date_start}
                className='ml-2'
                year='numeric'
                month='long'
                day='2-digit'
              />
            </span>
            <span> đến </span>
            <span className="ml-1">
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
            <strong>Điều kiện áp dụng: </strong> 
            {voucher.approved_condition === '' && 'Áp dụng cho tất cả mặt hàng'}
            {voucher.approved_condition}
          </p>
          <p>
            <strong>Hướng dẫn sử dụng: </strong>
            {voucher.instruction === '' && 'Phiếu mua mua hàng được sử dụng một lần duy nhất'}
            {voucher.instruction}
          </p>
        </blockquote>
      </div>

    );
  }
}

export default VoucherShowContent;
