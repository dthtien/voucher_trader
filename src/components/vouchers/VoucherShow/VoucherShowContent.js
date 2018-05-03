import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import VoucherType from '../shared/VoucherType';

class VoucherShowContent extends Component {
  static propTypes = {
    voucher: PropTypes.object.isRequired,
  };

  render() {
    const { voucher } = this.props
    console.log(voucher);
    return (
      <div className="voucher-show-content">
        <h3 className="text-center">
          {voucher.name}
          <VoucherType kind={voucher.kind}/>
        </h3>
        <p className="text-danger">{voucher.price} VND</p>
        <blockquote>
          {voucher.kind !== 'e' && <p><strong>Địa chỉ nhận: </strong>{voucher.address_receiver}</p>}
          <p>
            <strong>Thời gian sử dụng: </strong>
            <span className="mr-1">
              <Moment format='DD/MM/YYYY'>{voucher.date_start}</Moment>
            </span>
            -
            <span className="ml-1">
              <Moment format='DD/MM/YYYY'>{voucher.date_end}</Moment>
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
