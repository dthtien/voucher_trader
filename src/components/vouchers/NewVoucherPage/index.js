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
    const {errors, isValid} = StoreValidation(this.state.store);

    if (isValid) {
      return isValid
    } else {
      this.setState({
        ...this.state,
        storeErrors: errors
      });

      return isValid;
    }
  }

  isSecondStepValid = () => {
    const {errors, isValid} = VoucherValidation(this.state.voucher)

    if (isValid) {
      return isValid
    } else {
      this.setState({
        ...this.state,
        voucherErrors: errors
      });

      return isValid;
    }
  }

  isThirdStepValid = () => {
    const {errors, isValid} = VoucherMoreInfoValidation(this.state.voucher)

    if (isValid) {
      return isValid
    } else {
      this.setState({
        ...this.state,
        voucherErrors: errors
      });

      return isValid;
    }
  }

  handleThirdStepSubmit = () =>{
    if (this.isThirdStepValid()) {
      this.props.createVoucher(this.state)
        .then(response => {
          console.log(response);
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

  handleStoreFieldsChange = e =>{
    this.setState({
      ...this.state,
      store: {
        ...this.state.store,
        [e.target.name]: e.target.value 
      },
      storeErrors: {
        ...this.state.storeErrors,
        [e.target.name]: ''
      }
    });
  }

  handleVoucherFieldsChange = (e) =>{
    this.setState({
      ...this.state,
      voucher: {
        ...this.state.voucher,
        [e.target.name]: e.target.value 
      },
      voucherErrors: {
        ...this.state.voucherErrors,
        [e.target.name]: ''
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