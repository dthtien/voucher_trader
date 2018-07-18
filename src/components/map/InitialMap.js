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
import Rating from 'react-rating';
import voucherIcon from '../../resources/voucher_icon.png'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import {inputStyle} from '../../config/inputStyle';
import { Link } from 'react-router-dom';
import { FormattedNumber } from 'react-intl';


const defaultProps = {
  googleMapURL: process.env.REACT_APP_GOOGLE_MAP_URL,
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '800px' }} />,
  mapElement: <div style={{ height: '100%' }} />
}

const InitMap = compose(
  withProps(defaultProps),
  withScriptjs,
  withGoogleMap
)((props) =>{
  const {vouchers, location} = props;
  const renderMarkers = vouchers.map(voucher => {
    if (!voucher.store) {
      return;
    }else {
      return(
        <Marker
          options={{icon: voucherIcon}}
          key={voucher.id} 
          position={
            { lat: voucher.store.latitude, lng: voucher.store.longitude }
          }
          onClick={() => {props.showInfo(voucher)}}
        />
      );
    }
  });

  const renderInfor = () =>{
    if (props.isOpen) {
      return(
        <InfoWindow 
          position={{
            lat: props.currentVoucher.store.latitude,
            lng: props.currentVoucher.store.longitude
          }}
          onCloseClick={() => {props.onCloseInfo()}}>
          <div className='text-center'>
            <p>
              <Rating
                initialRating={props.currentVoucher.feedback_score}
                emptySymbol="fa fa-star-o text-warning"
                fullSymbol="fa fa-star text-warning"
                fractions={2}
                readonly={true}
              />
            </p>
            <Link to={`vouchers/${props.currentVoucher.id}`}>
              {props.currentVoucher.name}
            </Link>
            <p>{props.currentVoucher.store.name}</p>
            <p className="text-danger">
              <FormattedNumber 
                value={props.currentVoucher.price} 
                style="currency" 
                currency="VND"/>
            </p>
          </div>
        </InfoWindow>
      )
    } else {
      return null;
    }
  }

  const defaultCenter = () =>{
    let coords;
    if (vouchers.length > 0) {
      var i;
      for(i=0; i < vouchers.length; i++){
        if (vouchers[i].store.longitude) {
          let store = vouchers[i].store;
          coords = {
            lat: store.latitude,
            lng: store.longitude
          }
          return coords;
        }
      }
    }
  }


  const centerLcation = defaultCenter() || {lat: location.latitude, lng: location.longitude}
  defaultCenter();
  defaultCenter();
  
  return(
    <GoogleMap
      defaultZoom={18}
      defaultCenter={centerLcation}
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