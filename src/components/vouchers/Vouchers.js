import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';
import MapContainer from '../map/MapContainer';

class Vouchers extends Component {
  componentWillMount(){
    this.props.getVouchers();
  };

  renderVoucherList = () => {
    if (!this.props.vouchers) {
      return (<li>Loading..</li>);
    } else {
      return(
        <MapContainer vouchers={this.props.vouchers}/>
      );
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