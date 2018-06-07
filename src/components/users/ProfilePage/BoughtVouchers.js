import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class BoughtVouchers extends Component {
  renderVoucherList = ({vouchers}) => (
    vouchers.map((voucher, index)=>(
       this.renderVoucher(voucher, index)
    ))
  )

  renderVoucher = (voucher, index) => {
    const {userId, currentUserId} = this.props;
    const seller = voucher.seller
    if (userId === currentUserId) {
      return(
        <tr key={`voucher-bought-${index}`}>
          <td>{voucher.name}</td>
          <td>{voucher.date_end}</td>
          <td>{voucher.quantity}</td>
          <td>{voucher.price}</td>
          <td>
            <Link to={`/profile/${seller.id}`}>
              {seller.name}
            </Link>
          </td>
          <td>{seller.email}</td>
          <td>{seller.phone_number}</td>
        </tr>
      )
    } else {
      return(
        <tr key={`voucher-bought-${index}`}>
          <td>{voucher.name}</td>
          <td>{voucher.date_end}</td>
          <td>{voucher.quantity}</td>
          <td>Thông tin không thể hiên thị</td>
          <td>Thông tin không thể hiên thị</td>
          <td>Thông tin không thể hiên thị</td>
        </tr>
      );
    }
  }
  render() {
    console.log(this.props)
    return (
      <table className="table table-hover mt-2">
        <thead>
          <tr>
            <th>Mã gỉam gía</th>
            <th>Ngày hết hạn</th>
            <th>Số lượng</th>
            <th>Gía </th>
            <th>Tên người bán</th>
            <th>Email người bán</th>
            <th>Số điện thoại người bán</th>
          </tr>
        </thead>

        <tbody>
          {this.renderVoucherList(this.props)}
        </tbody>
      </table>  
    );
  }
}

export default BoughtVouchers;
