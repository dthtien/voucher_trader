import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';
import Voucher from './Voucher';
import SlideBar from '../shared/SlideBar';
import '../../resources/vouchers.scss'


class Vouchers extends Component {
  componentWillMount(){
    this.props.getVouchers();
  };

  renderVoucherList = () => {
    if (!this.props.vouchers) {
      return (<li>Loading..</li>);
    } else {
      const vouchersList = this.props.vouchers.map(voucher => {
        return <Voucher key={voucher.id} voucher={voucher} />;
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
        <div className="col col-md-3">
          <SlideBar />
        </div>
        <div className="col col-md-9">
          <div className="mt-1">
            {this.renderVoucherList()}
          </div>
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