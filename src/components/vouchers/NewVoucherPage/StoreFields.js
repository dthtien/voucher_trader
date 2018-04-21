import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import PlacesWithStandaloneSearchBox from '../../shared/PlacesWithStandaloneSearchBox';
import RegionSelect from '../../shared/RegionSelect';

class StoreFields extends Component {
  static propType = {
    fields: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  }

  render() {
    return (
       <div className='col-md-6 offset-md-3'>
        <h4 className="mt-3 text-center font-weight-bold mb-4">
          Đia điểm áp dụng mã gỉam gía</h4>
        <form className="mt-4" onSubmit={this.props.handleSubmit.bind(this)}>
          <PlacesWithStandaloneSearchBox
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvbIGzAY0F_RoyTwx2NEy5l_pykbxcYZk&v=3.exp&libraries=geometry,drawing,places"
            name='address'
            label="Địa chỉ"
            loadingElement={<div style={{ height: `100%` }}/>}
            value={this.props.fields.address}
            handleAddressChanged={this.props.handleAddressChanged}
            handleChange={this.props.handleChange}
            error={this.props.errors.address}
          />
          {this.props.fields.name !== '' && <TextFieldGroup 
            name='name'
            type="text"
            label="Tên địa điểm"
            value={this.props.fields.name}
            handleChange={this.props.handleChange}
            error={this.props.errors.name}
          />}

          <div className="mt-3 border-top-light">
            <h5 className="mt-3 mb-4">
              Them dia điểm áp dụng mã gỉam gía</h5>
              <RegionSelect />
          </div>
          <button className="btn btn-primary">Next Step</button>
        </form>
      </div>
    );
  }
}

export default StoreFields;