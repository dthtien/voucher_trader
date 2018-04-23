import React, {Component} from 'react';
import TextFieldGroup from '../../shared/TextFieldGroup';
import PlacesWithStandaloneSearchBox from '../../shared/PlacesWithStandaloneSearchBox';

export default class VoucherMoreInfoFields extends Component{
  renderWithVoucherType = () =>{
    if (this.props.fields.kind === 'e') {
      return(
        <TextFieldGroup 
          name='code'
          value={this.props.fields.code}
          label="Mã code"
          handleChange={this.props.handleChange}
          error={this.props.errors.code}
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
            error={this.props.errors.address_receiver}
          />
          <TextFieldGroup 
            name='image'
            type='file'
            label='Ảnh'
            value={this.props.fields.image || ''}
            handleChange={this.props.handleFieldFieldChange}
          />
        </div>
      );
    }
  }

  render(){
    return(
      <div className='col-md-4 offset-md-4 mt-3'>
        <h5 className="mb-3 ml-0">Voucher details</h5>
        <form className="ml-2" onSubmit={this.props.handleSubmit.bind(this)}>
          {this.renderWithVoucherType()}
          <TextFieldGroup 
            name='post_to_facebook'
            type='radio'
            label="Đăng lên facebook"
            value={this.props.fields.post_to_facebook}
            handleChange={this.props.handleRadioBtnChange}
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



