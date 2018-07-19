import React, { Component } from 'react';
import { fetchBoughtCarts } from "../../../actions/user";
import { connect } from 'react-redux';
import { FormattedDate } from 'react-intl';
import Spinner from '../../shared/Spinner';

class BoughtCarts extends Component {
  componentDidMount(){
    this.props.fetchBoughtCarts(this.props.userId);
  }

  renderVoucherList = ({carts, isLoading}) => {
    if (isLoading) {
      return(<tr><td><Spinner /></td></tr>)
    } else {
      return(
        carts.map(cart => (
           this.renderVoucher(cart)
        ))
      )
    }
  }

  renderVoucher = (cart) => {
    return(
      <tr key={`voucher-bought-${cart.id}`}>
        <td>
          <FormattedDate
            value={cart.created_at}
            className='ml-2'
            year='numeric'
            month='long'
            day='2-digit'
          />
        </td>
        <td>
          <a href={`/carts/${cart.id}`}>
            {cart.status === 'paid' ? "Đã thanh toán" : "" }
            {cart.status === 'shipping' ? 'Đang vận chuyển' : ''}
          </a>
        </td>
        <td>
          {cart.kind === 'payment' ? 'Thanh toán qua ngân hàng' : ''}
          {cart.kind === 'cod' ? 'Thanh toán khi nhận hàng': ''}
          {cart.kind === 'direct_contact' ? 'Liên hệ trực tiếp' : ''}
        </td>
        <th>
          {cart.cart_items.length}
        </th>
        <th>
          <a href={`/carts/${cart.id}`}>
            Xem Thêm
          </a>
        </th>
      </tr>
    )
  }
  render() {
    console.log(this.props)
    return (
      <table className="table table-hover mt-2">
        <thead>
          <tr>
            <th>Mua ngày</th>
            <th>Trạng thái</th>
            <th>Phương thức thanh toán</th>
            <th>Số lương sản phẩm </th>
            <th></th>
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
  carts: state.cart.carts,
  isLoading: state.cart.isLoading
})

export default connect(mapStateToProps, {fetchBoughtCarts})(BoughtCarts);
