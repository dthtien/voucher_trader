import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Link } from 'react-router-dom';
import { getVouchers } from '../../actions/voucher';

class Vouchers extends Component {
  componentWillMount(){
    this.props.getVouchers();
  };

  renderVoucherList = () => {
    console.log(this.props.vouchers);

    if (this.props.loading) {
      return (<li>Loading </li>);
    } else {
      return this.props.vouchers.map( voucher => {
          return (
            <li key = {voucher.id_s}>
              <Link to={"vouchers/" + voucher.id_s}>
                {voucher.content} - {voucher.price}
              </Link>
            </li>
          );
        })
    }
  }
  
  render() {
    return (
      <div className="App">
        <Link to="vouchers/new" className="btn btn-warning m-2">
          Create Vouchers
        </Link>
        <p className="App-intro">
          Vouchers
        </p>
        <ul>
          {this.renderVoucherList()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vouchers: state.vouchers.all,
  loading: state.vouchers.loading
});

export default connect(mapStateToProps, {getVouchers: getVouchers})(Vouchers);