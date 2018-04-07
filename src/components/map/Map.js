import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { getVouchers } from '../../actions/voucher';
import { googleMapConfig } from '../../config/googleMapConfig';

import Marker from './Marker';

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 10.846247,
      lng: 106.778941
    },
    zoom: 14
  };

  componentWillMount(){
    this.props.getVouchers();
  }

  renderVouchersOnMap = () => {
    if (!this.props.vouchers) {
      return (
        <Marker
          lat={10.846247}
          lng={106.778941}
          text={'default'}
        />
      );
    } else {
      return this.props.vouchers.map( voucher => {
          return (
            <Marker
              key={voucher.id}
              lat={voucher.latitude}
              lng={voucher.longitude}
              text={voucher.description}
            />
          );
        })
    }
  }


  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys = {
            {
              key: 'AIzaSyAvbIGzAY0F_RoyTwx2NEy5l_pykbxcYZk',
              libraries: 'geometry drawing places'
            }
          }
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          heatmapLibrary={true}
        >
          {this.renderVouchersOnMap()}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vouchers: state.vouchers.all,
  loading: state.vouchers.loading
})
export default connect(mapStateToProps, {getVouchers})(SimpleMap);