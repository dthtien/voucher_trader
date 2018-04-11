import React, { Component } from 'react'; 
import InitialMap from './InitialMap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';

export default class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      currentVoucher: {}
    }
  }

  static propsTypes = {
    vouchers: PropTypes.object.isRequired
  }

  showInfor = (data) => {
    console.log(data)
    if (data) {
      this.setState({
        isOpen: true,
        currentVoucher: data
      });
    }
  }

  onCloseInfo = () => {
    this.setState({
      isOpen: false,
      currentVoucher: false
    });
  }
  render() {
    return (
      <InitialMap
        onMarkerClick={this.handleMarkerClick}
        vouchers={this.props.vouchers}
        showInfo={this.showInfor}
        isOpen={this.state.isOpen}
        currentVoucher={this.state.currentVoucher}
        onCloseInfo={this.onCloseInfo}
      />
    )
  }
}