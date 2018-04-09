import React, { Component } from 'react'; 
import InitialMap from './InitialMap';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';

class MapContainer extends Component {
  componentWillMount(){
    this.props.getVouchers();
  }

  render() {
    console.log("mapcontainer");
    return (
      <InitialMap
        onMarkerClick={this.handleMarkerClick}
        vouchers={this.props.vouchers}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  vouchers: state.vouchers.all
})

export default connect(mapStateToProps, {getVouchers})(MapContainer);