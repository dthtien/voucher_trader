import React, {Component} from 'react';
import TextFieldGroup from '../../shared/TextFieldGroup';
import PlacesWithStandaloneSearchBox from '../../shared/PlacesWithStandaloneSearchBox';

export default class VoucherInfoFields extends Component{
  constructor(props){
    super(props);

    this.state ={
      type: '',
      description: '',
      price: 0, 
      code: '', 
      address_receiver: '',
    }
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(){
    return(
      <div>
        <h5 className="mb-3 ml-0">Voucher details</h5>
        <form className="ml-2" onSubmit={this.props.handleSubmit.bind(this)}>
          <TextFieldGroup 
            name='type'
            value={this.state.type}
            handleChange={this.handleChange}
          />
          <TextFieldGroup 
            name='description'
            value={this.state.description}
            handleChange={this.handleChange}
          />

          <TextFieldGroup 
            name='price'
            type='number'
            value={this.state.price}
            handleChange={this.handleChange}
          />

          <TextFieldGroup 
            name='code'
            value={this.state.code}
            handleChange={this.handleChange}
          />
          <PlacesWithStandaloneSearchBox
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }}/>}
            name='address_receiver'
            handleAddressChanged={this.props.handleAddressChanged}
            value={this.state.address}
            handleChange={this.handleChange}
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



