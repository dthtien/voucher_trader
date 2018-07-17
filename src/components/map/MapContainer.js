import React, { Component } from 'react'; 
import InitialMap from './InitialMap';
import Spinner from '../shared/Spinner';
import {connect} from 'react-redux';
import { getVouchersFromCoordinates } from '../../actions/voucher';
import { getLocation } from '../../actions/location';
import isEmpty from 'lodash/isEmpty';

class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      currentVoucher: {}
    }
  }

  componentDidMount(){
    this.props.getLocation();
  }
  
  componentWillReceiveProps(nextProps){
    if (isEmpty(nextProps.vouchers)) {
      this.props.getVouchersFromCoordinates(nextProps.location);
    }
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
    if (this.props.isLoadingLocation) {
      return <Spinner />
    } else {  
      return (
        <InitialMap
          onMarkerClick={this.handleMarkerClick}
          vouchers={this.props.vouchers}
          location={this.props.location}
          isLoadingVoucher={this.props.isLoadingVoucher}
          showInfo={this.showInfor}
          isOpen={this.state.isOpen}
          currentVoucher={this.state.currentVoucher}
          onCloseInfo={this.onCloseInfo}
        />
      )
    }
    }
}

const mapStateToProps = (state) => ({
  vouchers: state.vouchers.all,
  location: state.locations.location,
  isLoadingLocation: state.locations.isLoadingLocation,
  isLoadingVoucher: state.vouchers.loading
})

export default connect(mapStateToProps, 
  {getVouchersFromCoordinates, getLocation})(MapContainer);