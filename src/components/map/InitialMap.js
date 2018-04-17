/* global google*/
import React from "react";
import { compose, withProps } from "recompose";
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import voucherIcon from '../../resources/voucher_icon.png'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import {inputStyle} from '../../config/inputStyle';

const InitMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) =>{
  const renderMarkers = props.vouchers.map(voucher => {
    return(
      <Marker
        options={{icon: voucherIcon}}
        key={voucher.id} 
        position={{ lat: voucher.latitude, lng: voucher.longitude }}
        onClick={() => {props.showInfo(voucher)}}
      />
    )
  });

  const renderInfor = () =>{
    if (props.isOpen) {
      return(
        <InfoWindow 
          position={{
            lat: props.currentVoucher.latitude,
            lng: props.currentVoucher.longitude
          }}
          onCloseClick={() => {props.onCloseInfo()}}>
          <div>
            Hello
          </div>
        </InfoWindow>
      )
    } else {
      return null;
    }
  }

  return(
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{lat: 10.846247, lng: 106.778941}}
    >
      <SearchBox
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={inputStyle()}
        />
      </SearchBox>
      {renderMarkers}
      {renderInfor()}
    </GoogleMap>
  )
})

export default InitMap;