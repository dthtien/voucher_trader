import React, { Component }from 'react';
import { connect } from 'react-redux'; 
import StoreFields from './StoreFields';
import VoucherInfoFields from './VoucherInfoFields';
import VoucherMoreInfoFields from './VoucherMoreInfoFields';
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
        kind: '',
        description: '',
        price: '',
        code: '',
        address_receiver: '',
        post_to_facebook: false,
        image: null
      }, 
      currentStep: 1
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.currentStep === 3) {
      this.props.createVoucher(this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response)
      })
    } else {
      this.changeStep(1);
    }
  }

  previousStep = (e) => {
    e.preventDefault();
    this.changeStep(-1);
  }
  
  changeStep = (step) => {
    this.setState({
      ...this.state,
      currentStep: this.state.currentStep + step
    })
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

  handleVoucherFieldsChange = (e) =>{
    this.setState({
      ...this.state,
      voucher: {
        ...this.state.voucher,
        [e.target.name]: e.target.value 
      }
    });
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

  handleVoucherAddressChanged = (text) =>{
    this.setState({
      ...this.state,
      voucher: {
        ...this.state.voucher,
        address_receiver: text
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
            handleChange={this.handleVoucherFieldsChange}
            handleSubmit={this.handleSubmit}
            previousStep={this.previousStep}
          />
        )
      case 3:
        return(
          <VoucherMoreInfoFields
            fields={this.state.voucher}
            handleChange={this.handleVoucherFieldsChange}
            handleAddressChanged={this.handleVoucherAddressChanged}
            handleSubmit={this.handleSubmit}
            previousStep={this.previousStep}
          />
        )
      default:
        return(
          <h1>Success!</h1>
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

export default connect(null, {createVoucher, addFlashMessage})(NewVoucherPage)