import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/voucher';

class NewVoucher extends Component {
  render(){
    return(
      <div className="container">
        <h1 className="text-center m-3">
          Show Voucher
        </h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    voucher: state.vouchers.voucher,
    loading: state.vouchers.loading
  }
};

export default connect(mapStateToProps)(NewVoucher);