import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Link } from 'react-router-dom';
import { getVouchers } from '../../actions/voucher';

class Vouchers extends Component {
  componentWillMount(){
    this.props.getVouchers();
  };

  renderVoucherList = () => {
    if (!this.props.vouchers) {
      return (<li>Loading..</li>);
    } else {
      return this.props.vouchers.map( voucher => {
          return (
            <li key = {voucher.id}>
              <Link to={"vouchers/" + voucher.id}>
                {voucher.description} - {voucher.kind}
              </Link>
            </li>
          );
        })
    }
  }
  
  render() {
    return (
      <div className="App">
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