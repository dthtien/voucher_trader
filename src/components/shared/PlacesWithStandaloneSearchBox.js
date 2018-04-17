import React from 'react';
import { withScriptjs } from 'react-google-maps';
import classnames from 'classnames';
import {StandaloneSearchBox} from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const PlacesWithStandaloneSearchBox = withScriptjs(props => 
  <div className='form-group'>
    <label className='control-label font-weight-bold'> 
      {props.name.toTitlelize()}
    </label>

    <StandaloneSearchBox
      onPlacesChanged={()=> {
         props.handleAddressChanged(document.getElementsByClassName('address')[0].value);
      }}>
      <input
        type="text"
        name={props.name}
        placeholder="Enter an address"
        value={props.value}
        onChange={props.handleChange.bind(this)}
        onKeyUp={props.handleChange.bind(this)}
        onKeyDown={props.handleChange.bind(this)}
        className={classnames('form-control address', 
          {'is-invalid': props.error})}
      />
    </StandaloneSearchBox>
    {props.error && <span className="text-danger">{props.error}</span>}
  </div>
)

export default PlacesWithStandaloneSearchBox;