import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';
import {
  Map, 
  Marker,
  GoogleApiWrapper,
  InfoWindow
} from 'google-maps-react';

const GoogleMapConfig = {
  key: 'AIzaSyCxCiL6khLdmEmHZh9A5fCOitV3iy2jY0A',
  libraries: 'places',
};

const LoadingContainer = (props) => (
  <h1>Loading...!</h1>
)

export class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
  }

  componentWillMount(){
    this.props.getVouchers();
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
      console.log(voucher);
      return(
        <Marker
          key={voucher.id}
          name={voucher.kind}
          title={`${voucher.kind}- ${voucher.description}`}
          position={{lat: voucher.latitude, lng: voucher.longitude}}
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
    return(
      <Map google={this.props.google}
          initialCenter={{
            lat: 10.846247,
            lng: 106.778941
          }}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}>

          {this.renderVouchersOnMap()}
      </Map>
    )
  }
}

MapContainer = GoogleApiWrapper({
  apiKey: GoogleMapConfig.key,
  LoadingContainer: LoadingContainer 
})(MapContainer)

const mapStateToProps = (state) => {
  console.log('state', state);
  return{
    vouchers: state.vouchers.all,
  }
}

export default connect(mapStateToProps, {getVouchers})(MapContainer);