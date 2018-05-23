import React, { Component } from 'react';
import PlacesWithStandaloneSearchBox from '../shared/PlacesWithStandaloneSearchBox';
import TextFieldGroup from '../shared/TextFieldGroup';

class ShippingForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      direct_contact: false,
      shipping_address: '',
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }
  
  handleAddressChanged = (text) => {
    this.setState({
      ...this.state,
      shipping_address: text
      }
    );
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  } 

  handleRadioBtnChange = (value) => {
    this.setState({
      ...this.state,
      direct_contact: value
    });
  }

  render() {
    return (
      <div className='container mt-5'>
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup 
            name='direct_contact'
            type='radio'
            label="Liên hệ trực tiếp"
            value={this.state.direct_contact}
            handleChange={this.handleRadioBtnChange}
          />

          {
            !this.state.direct_contact && <PlacesWithStandaloneSearchBox
            loadingElement={<div style={{ height: `100%` }}/>}
            name='shipping_address'
            label='Địa chỉ nhận:'
            handleAddressChanged={this.handleAddressChanged}
            value={this.state.shipping_address}
            handleChange={this.handleChange}
            error={this.state.errors.shipping_address}
          />
        }
        <div className='text-center'>
          <button className="btn red">
            Tiến hành thanh toán
          </button>
        </div>
        </form>
      </div>  
    );
  }
}

export default ShippingForm;
