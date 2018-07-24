import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVouchersFromCoordinates } from '../../actions/voucher';
import { getLocation } from '../../actions/location';
import {
  Map, 
  Marker,
  GoogleApiWrapper,
  InfoWindow
} from 'google-maps-react';
import Spinner from '../shared/Spinner';
import isEmpty from 'lodash/isEmpty';

export class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
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

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  renderVouchersOnMap(){
    const google = this.props.google;

    return this.props.vouchers.map(voucher => {
      if (!voucher.store) {
        return;
      }
      return(
        <Marker
          key={voucher.id}
          name={voucher.kind}
          title={`${voucher.kind}- ${voucher.description}`}
          position={
            {lat: voucher.store.latitude, lng: voucher.store.longitude}
          }
        >
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Marker>
      );
    });
  }

  render(){
    const {location, isLoadingLocation} = this.props;

    if (isLoadingLocation) {
      return <Spinner />
    } else {  
    return(
      <Map 
        google={this.props.google}
        initialCenter={{
          lat: location.latitude,
          lng: location.longitude
        }}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={15}>
          {this.renderVouchersOnMap()}
      </Map>
    )
    }
  }
}

MapContainer = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  LoadingContainer: Spinner 
})(MapContainer)

const mapStateToProps = (state) => ({
  vouchers: state.vouchers.all,
  location: state.locations.location,
  isLoadingLocation: state.locations.isLoadingLocation
})

export default connect(mapStateToProps, 
  {getVouchersFromCoordinates, getLocation})(MapContainer);