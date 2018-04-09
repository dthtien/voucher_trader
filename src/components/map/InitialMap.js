/* global google*/
import _ from 'lodash';
import React from "react";
import { compose, withProps } from "recompose";
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

const INPUT_STYLE = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
}

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
  console.log(props.vouchers)

  const renderMarkers = props.vouchers.map(voucher => {
    return(
      <Marker
        options={{icon: 'https://i.imgur.com/9G5JOp8.png'}}
        key={voucher.id} 
        position={{ lat: voucher.latitude, lng: voucher.longitude }}
        onClick={() => {props.showInfro}}
      />
    )
  });

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
          style={INPUT_STYLE}
        />
      </SearchBox>
      {renderMarkers}
    </GoogleMap>
  )
})

export default InitMap;