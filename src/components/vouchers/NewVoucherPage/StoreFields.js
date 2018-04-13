import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import PlacesWithStandaloneSearchBox from '../../shared/PlacesWithStandaloneSearchBox';

class StoreFields extends Component {
  render() {
    return (
      <div>
        <h4 className="mt-3 text-center font-weight-bold">Store Informations</h4>
        <form className="ml-2">
          <TextFieldGroup 
            name='name'
            value={this.props.fields.name}
            handleChange={this.props.handleChange}
          />
          <PlacesWithStandaloneSearchBox
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
            name='address'
            loadingElement={<div style={{ height: `100%` }}/>}
            value={this.props.fields.address}
            handleChange={this.props.handleChange}
          />

        </form>
      </div>
    );
  }
}

export default StoreFields;