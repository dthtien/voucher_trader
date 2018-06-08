import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getNewestVouchers } from '../../actions/voucher'
import Voucher from '../vouchers/Voucher';
import Spinner from '../shared/Spinner';

class NewestVouchers extends Component {
  componentDidMount(){
    this.props.getNewestVouchers();
  }

  renderVoucherList = () => (
    this.props.vouchers.map((voucher, index) => (
      <Voucher key={index} voucher={voucher} />
    ))
  );

  render() {
    if (this.props.loading) {
      return( <Spinner /> );
    } else {
      return (
        <div className="vouchers">
          <div className="row">
            {this.renderVoucherList()}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  vouchers: state.vouchers.all,
  loading: state.vouchers.loading
});

export default connect(mapStateToProps, { getNewestVouchers })(NewestVouchers);
