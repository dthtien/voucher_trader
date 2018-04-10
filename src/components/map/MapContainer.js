import React, { Component } from 'react'; 
import InitialMap from './InitialMap';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';

class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      currentVoucher: {}
    }
  }

  componentWillMount(){
    this.props.getVouchers();
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

const mapStateToProps = (state) => ({
  vouchers: state.vouchers.all
})

export default connect(mapStateToProps, {getVouchers})(MapContainer);