import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import PlacesWithStandaloneSearchBox from '../../shared/PlacesWithStandaloneSearchBox';

class StoreFields extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      address: ''
    }
  }

  handleChange = (e) =>{
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div>
        <h5 className="mb-3">Store Informations</h5>
        <form className="ml-2">
          <TextFieldGroup 
            name='name'
            value={this.state.name}
            handleChange={this.handleChange}
          />
          <PlacesWithStandaloneSearchBox
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
            name='address'
            loadingElement={<div style={{ height: `100%` }}/>}
            value={this.state.address}
            handleChange={this.handleChange}
          />

        </form>
      </div>
    );
  }
}

export default StoreFields;