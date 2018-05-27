import React, { Component, PropTypes } from 'react';

class ContactTable extends Component {
    renderListSellerInfo = () => {
      console.log(this.props.sellers_info);
      return this.props.sellers_info.map((info, index) => {
        return(
          <tr key={`seller-infor-${index}`}>
            <td>{info.voucher_name}</td>
            <td>{info.user_name}</td>
            <td>{info.phone_number}</td>
            <td>{info.email}</td>
          </tr>
        )
      });
    }
    render() {
      return (
        <div className='mt-2'>
          <h4 className='text-center font-weight-bold'>
            Thông tin người bán.
          </h4>
          <table className="table table-hover mt-2">
            <thead>
              <tr>
                <th>Mã gỉam gía</th>
                <th>Tên người bán</th>
                <th>Số điện thoại</th>
                <th>Email </th>
              </tr>
            </thead>

            <tbody>
              {this.renderListSellerInfo()}
            </tbody>
          </table>
        </div>
      );
    }
}

export default ContactTable;
