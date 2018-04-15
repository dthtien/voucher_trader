import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';
import Voucher from './Voucher';
import SlideBar from '../shared/SlideBar';


class Vouchers extends Component {
  componentWillMount(){
    this.props.getVouchers();
  };

  renderVoucherList = () => {
    if (!this.props.vouchers) {
      return (<li>Loading..</li>);
    } else {
      const vouchersList = this.props.vouchers.map(voucher => {
        return <Voucher key={voucher.id} />;
      })

      return(
        <div className="voucher-list">
          {vouchersList}
        </div>
      );
    }
  }
  
  render() {
    return (
      <div className="row">
        <div className="col col-md-3 bg-secondary">
          <SlideBar />
        </div>
        <div className="col col-md-9">
          {this.renderVoucherList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vouchers: state.vouchers.all,
  loading: state.vouchers.loading
});

export default connect(mapStateToProps, {getVouchers: getVouchers})(Vouchers);