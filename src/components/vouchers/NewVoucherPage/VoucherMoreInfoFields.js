import React, {Component} from 'react';
import TextFieldGroup from '../../shared/TextFieldGroup';
import PlacesWithStandaloneSearchBox from '../../shared/PlacesWithStandaloneSearchBox';

export default class VoucherMoreInfoFields extends Component{
  renderWithVoucherType = () =>{
    if (this.props.fields.type === 'e') {
      return(
        <TextFieldGroup 
          name='code'
          value={this.props.fields.code}
          handleChange={this.props.handleChange}
        />
      );
    } else {
      return(
        <div>
          <PlacesWithStandaloneSearchBox
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvbIGzAY0F_RoyTwx2NEy5l_pykbxcYZk&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }}/>}
            name='address_receiver'
            handleAddressChanged={this.props.handleAddressChanged}
            value={this.props.fields.address_receiver}
            handleChange={this.props.handleChange}
          />
          <TextFieldGroup 
            name='image'
            type='file'
            value={this.props.fields.image || ''}
            handleChange={this.props.handleChange}
          />
        </div>
      );
    }
  }

  render(){
    return(
      <div>
        <h5 className="mb-3 ml-0">Voucher details</h5>
        <form className="ml-2" onSubmit={this.props.handleSubmit.bind(this)}>
          {this.renderWithVoucherType()}
          <TextFieldGroup 
            name='post_to_facebook'
            type='radio'
            value={this.props.fields.post_to_facebook}
            handleChange={this.props.handleChange}
          />

          <button 
            className="btn btn-warning m-2"
            onClick={this.props.previousStep.bind(this)}
          >Privious Step </button>
          <button className="btn btn-primary">Next Step </button>
  
        </form>
      </div>
    );
  }
}



