import React, { Component }from 'react';
import { connect } from 'react-redux'; 
import StoreFields from './StoreFields';
import VoucherInfoFields from './VoucherInfoFields';
import VoucherMoreInfoFields from './VoucherMoreInfoFields';
import {createVoucher} from '../../../actions/voucher';
import { addFlashMessage } from '../../../actions/message';
import { 
  StoreValidation, 
  VoucherValidation, 
  VoucherMoreInfoValidation
} from '../../../validates';


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
      currentStep: 1,
      storeErrors: {},
      voucherErrors: {},
      serverErrors:{},
    }
  }

  isFirstStepValid = () => {
    return this.isStepValid('store', 'storeErrors');
  }

  isSecondStepValid = () => {
    return this.isStepValid('voucher', 'voucherErrors');
  }

  isThirdStepValid = () => {
    return this.isStepValid('voucherMoreInfo', 'voucherErrors');
  }

  isStepValid = (type, errorType) => {
    var errorsHandle = {};
    if (type === 'store') {
      errorsHandle = StoreValidation(this.state.store);
    }
    if (type === 'voucher') {
      errorsHandle = VoucherValidation(this.state.voucher)
    }
    if (type === 'voucherMoreInfo') {
      errorsHandle = VoucherMoreInfoValidation(this.state.voucher)
    }
    const {errors, isValid} = errorsHandle;    

    if (isValid) {
      return isValid
    } else {
      this.setState({
        ...this.state,
        [errorType]: errors
      });

      return isValid;
    }
  }
  handleThirdStepSubmit = () =>{
    if (this.isThirdStepValid()) {
      this.props.createVoucher(this.state)
        .then(response => {
          this.changeStep(1);
        })
        .catch(error => {
          console.log(error.response);
          this.setState({
            ...this.state,
            currentStep: 1,
            serverErrors: error.response
          })
        })
    } else {
      return false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    switch(this.state.currentStep){
      case 1:
        return this.isFirstStepValid() ? this.changeStep(1): false;
      case 2:
        return this.isSecondStepValid() ? this.changeStep(1): false;
      case 3:
        return this.handleThirdStepSubmit();
      default:
        return this.changeStep(1);
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


  handleFieldsChange = (e, type, errors) => {
    this.setState({
      ...this.state,
      [type]: {
        ...this.state[type],
        [e.target.name]: e.target.value 
      },
      [errors]: {
        ...this.state[errors],
        [e.target.name]: ''
      }
    });
  }
  
  handleStoreFieldsChange = e =>{
    this.handleFieldsChange(e, 'store', 'storeErrors');
  }

  handleVoucherFieldsChange = (e) =>{
    this.handleFieldsChange(e, 'voucher', 'voucherErrors');
  }

  handleAddressChanged = (text, type, addressField) => {
    this.setState({
      ...this.state,
      [type]: {
        ...this.state[type],
        [addressField]: text
      }
    });
  }

  handleStoreAddressChanged = text => {
    this.handleAddressChanged(text, 'store', 'address'); 

    this.setState({
      ...this.state,
      store: {
        ...this.state.store,
        name: this.state.store.address.split(',')[0]
      }
    });
  }


  handleVoucherAddressChanged = (text) =>{
    this.handleAddressChanged(text, 'voucher', 'address_receiver'); 
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
            errors={this.state.storeErrors}
          />
        )
      case 2:
        return(
          <VoucherInfoFields
            fields={this.state.voucher}
            errors={this.state.voucherErrors}
            handleChange={this.handleVoucherFieldsChange}
            handleSubmit={this.handleSubmit}
            previousStep={this.previousStep}
          />
        )
      case 3:
        return(
          <VoucherMoreInfoFields
            fields={this.state.voucher}
            errors={this.state.voucherErrors}
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
    console.log(this.props)
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