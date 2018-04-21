import React from 'react';
import { withScriptjs } from 'react-google-maps';
import classnames from 'classnames';
import {StandaloneSearchBox} from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import {Input} from 'mdbreact';

const PlacesWithStandaloneSearchBox = withScriptjs(props => 
  <div className='form-group'>
    <StandaloneSearchBox
      onPlacesChanged={()=> {
         props.handleAddressChanged(document.getElementsByClassName('address')[0].value);
      }}>
      <Input
        type="text"
        hint=''
        defaultValue={props.value}
        name={props.name}
        label={props.label}
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

PlacesWithStandaloneSearchBox.defaultProps = {
  label: "Địa chỉ"
}

export default PlacesWithStandaloneSearchBox;