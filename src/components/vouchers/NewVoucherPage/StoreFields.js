import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import PlacesWithStandaloneSearchBox from '../../shared/PlacesWithStandaloneSearchBox';

class StoreFields extends Component {
  static propType = {
    fields: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <h4 className="mt-3 text-center font-weight-bold">
          Đia điểm áp dụng mã gỉam gía</h4>
        <form className="ml-2" onSubmit={this.props.handleSubmit.bind(this)}>

          <PlacesWithStandaloneSearchBox
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvbIGzAY0F_RoyTwx2NEy5l_pykbxcYZk&v=3.exp&libraries=geometry,drawing,places"
            name='address'
            loadingElement={<div style={{ height: `100%` }}/>}
            value={this.props.fields.address}
            handleAddressChanged={this.props.handleAddressChanged}
            handleChange={this.props.handleChange}
            error={this.props.errors.address}
          />
          
          <TextFieldGroup 
            name='name'
            value={this.props.fields.name}
            handleChange={this.props.handleChange}
            error={this.props.errors.name}
          />
          <button 
            className="btn btn-warning m-2"
            onClick={this.props.previousStep.bind(this)}
          >Privious Step</button>
          <button className="btn btn-primary">Next Step</button>
        </form>
      </div>
    );
  }
}

export default StoreFields;