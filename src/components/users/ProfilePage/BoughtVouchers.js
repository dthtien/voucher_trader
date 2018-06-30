import React, { Component } from 'react';
import { fetchVoucherBoughts } from "../../../actions/user";
import { connect } from 'react-redux';
import { FormattedDate } from 'react-intl';

class BoughtVouchers extends Component {
  componentDidMount(){
    this.props.fetchVoucherBoughts(this.props.userId);
  }

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
          <td>
            <FormattedDate
              value={voucher.date_end}
              className='ml-2'
              year='numeric'
              month='long'
              day='2-digit'
            />
          </td>
          <td>{voucher.quantity}</td>
          <td>{voucher.price}</td>
          <td>
            <a href={`/profile/${seller.id}`}>
              {seller.name}
            </a>
          </td>
          <td>{seller.email}</td>
          <td>{seller.phone_number}</td>
        </tr>
      )
    } else {
      return(
        <tr key={`voucher-bought-${index}`}>
          <td>{voucher.name}</td>
          <td>
            <FormattedDate
              value={voucher.date_end}
              className='ml-2'
              year='numeric'
              month='long'
              day='2-digit'
            />
          </td>
          <td>{voucher.quantity}</td>
          <td>Thông tin không thể hiên thị</td>
          <td>Thông tin không thể hiên thị</td>
          <td>Thông tin không thể hiên thị</td>
        </tr>
      );
    }
  }
  render() {
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

const mapStateToProps = (state) => ({
  vouchers: state.vouchers.all,
  loading: state.vouchers.loading
})

export default connect(mapStateToProps, {fetchVoucherBoughts})(BoughtVouchers);
