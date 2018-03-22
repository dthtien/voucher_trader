import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import {  Link } from 'react-router-dom';
import { getVouchers } from '../../actions/voucher';

class Vouchers extends Component {
  componentWillMount(){
    this.props.getVouchers();
  }
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Link to="vouchers/new" className="btn btn-warning">
          Create Vouchers
        </Link>
        <p className="App-intro">
          Vouchers

        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getVouchers: getVouchers
});

export default connect(mapStateToProps)(Vouchers);