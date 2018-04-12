/*global google*/
import React from 'react';
import { compose } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import {StandaloneSearchBox} from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import {inputStyle} from '../../config/inputStyle';

const PlacesWithStandaloneSearchBox = withScriptjs(props => 
  <div className='form-group'>
    <label className='control-label font-weight-bold'> 
      {props.name.toTitlelize()}
    </label>

    <StandaloneSearchBox>
      <input
        type="text"
        name={props.name}
        placeholder="Enter an address"
        onKeyUp={props.handleChange.bind(this)}
        className='form-control'
      />
    </StandaloneSearchBox>
  </div>
)

export default PlacesWithStandaloneSearchBox;