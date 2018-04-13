import React, { Component }from 'react';
import { connect } from 'react-redux'; 
import NewVoucherForm from './NewVoucherForm';
import StoreFields from './StoreFields';
import VoucherInfoFields from './VoucherInfoFields';
import VoucherPostingOption from './VoucherPostingOption';
import { 
  Route,
  Switch
} from 'react-router-dom';
import {createVoucher} from '../../../actions/voucher';
import { addFlashMessage } from '../../../actions/message';

class NewVoucherPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      store: {
        name: '',
        address: ''
      },

      voucher: {
        type: '',
        description: '',
        price: '',
        code: '',
        address_receiver: ''
      }, 
      currentStep: 1
    }
  }

  handleVoucherFieldsChange = (e) =>{
    this.setState({
      voucher: {
        [e.target.name]: e.target.value
      }
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.store)

  }

  changeStep = (step) => {
    this.setState({
      ...this.state,
      currentStep: this.state.currentStep + step
    })
  }

  handleStoreAddressChanged = text => {
    this.setState({
      ...this.state,
      store: {
        ...this.state.store,
        address: text
      }
    });
  }

  handleStoreFieldsChange = e =>{
    this.setState({
      ...this.state,
      store: {
        ...this.state.store,
        [e.target.name]: e.target.value 
      }
    });
  }

  showStep = () => {
    switch(this.state.currentStep){
      case 1:
        return(
          <StoreFields
            fields={this.state.store}
            handleChange={this.handleStoreFieldsChange}
            handleAddressChanged={this.handleStoreAddressChanged}
            handleSubmit={this.handleSubmit}
          />
        )
      case 2:
        return(
          <VoucherInfoFields
            fields={this.state.voucher}
            handleChange={this.handleStoreFieldsChange} 
          />
        )
      case 3:
        return(
          <VoucherPostingOption
            fields={this.state} 
          />
        )
    }
  }
  render(){
    return(
      <div className='row'>
        <div className='col-md-4 offset-md-4'>
          {this.showStep()}
        </div>
      </div> 
    );      
  }
}

export default connect (null, {createVoucher, addFlashMessage})(NewVoucherPage)