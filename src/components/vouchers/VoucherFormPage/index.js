import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import StoreFields from './StoreFields';
import VoucherInfoFields from './VoucherInfoFields';
import VoucherMoreInfoFields from './VoucherMoreInfoFields';
import CategoryFields from './CategoryFields';
import {createVoucher, updateVoucher} from '../../../actions/voucher';
import { getCategories } from '../../../actions/category';
import { toast } from 'react-toastify';
import { createImage, deleteImage} from '../../../actions/image'
import '../../../resources/newVoucher.scss';

import { 
  StoreValidation, 
  VoucherValidation, 
  VoucherMoreInfoValidation
} from '../../../validates';


class VoucherFormPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      ...props.data,
      currentStep: 0,
      storeErrors: {},
      voucherErrors: {},
      serverErrors:{},
    }
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount(){
    const {isAuthenticate, currentUser} = this.props.users
    if (!isAuthenticate) {
      toast.error("Bạn phải đăng nhập trước");
      this.context.router.history.push('/login');
    }

    if (isAuthenticate && !currentUser.active) {
      toast.error('Bạn phải xác nhận tài khoản trước'); 
      this.context.router.history.push('/verify');
    }
  }

// Handle step by step submit
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
    if(type==='store'){errorsHandle = StoreValidation(this.state.store);}
    if(type==='voucher'){errorsHandle = VoucherValidation(this.state.voucher)}
    if(type==='voucherMoreInfo'){errorsHandle = VoucherMoreInfoValidation(this.state.voucher)}

    const {errors, isValid} = errorsHandle;    

    if (isValid) { return isValid} else {
      this.setState({
        ...this.state,
        [errorType]: errors
      });
      return isValid;
    }
  }

  handleThirdStepSubmit = () =>{
    if (this.isThirdStepValid()) {
      const {createVoucher, updateVoucher} = this.props;
      const currentAction = (this.state.voucher.id) ? updateVoucher : createVoucher;

      currentAction(this.state)
        .then(response => {
          toast.success("Thành công");
          this.context.router.history.push(`/vouchers/${response.data.voucher.id}`);
        })
        .catch(error => {
          console.log(error.response);
          toast.error(error.response.data);
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
        return this.isSecondStepValid() ? this.changeStep(1): false;
      case 2:
        return this.handleThirdStepSubmit();
      default:
        return this.changeStep(1);
    }
  }
//end
// Handle change step
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
//end
// Handle fields change
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

  handleVoucherFieldsChange = (e) => {
    this.handleFieldsChange(e, 'voucher', 'voucherErrors');
  }
// end
// Handle region change
  handleRegionSelectChange = (value) =>{
    console.log(this.state.voucher);
    this.setState({
      ...this.state,
      voucher: {
        ...this.state.voucher,
        approved_regions_attributes: value
      }
    });
  }
// end
// Handle address fields change
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
        name: this.state.store.address.split(',')[0],
        showStoreName: true
      }
    });
  }

  handleVoucherAddressChanged = (text) => {
    this.handleAddressChanged(text, 'voucher', 'address_receiver'); 
  }
// end
// Handle date fields change
  handleDateFieldChange = (value, field) => {
    this.setState({
      ...this.state, 
      voucher: {
        ...this.state.voucher,
        [field]: value
      }
    });
  }
// end
// handle radioBtn change
  handleRadioBtnChange = (value) => {
    this.setState({
      ...this.state,
      voucher: {
        ...this.state.voucher,
        post_to_facebook: value
      }
    });
  }
// end
// Handle file field change
  handleFileFieldChange = (files) => {
    files.map(file => {
      return this.props.createImage(file)
        .then(response => {
          this.setImageField(response.data.image)
          return;
        })
        .catch(error => {
          console.log(error.response);
          return;
        })
    });
  }

  setImageField = (image) => {
    console.log(image)
    this.setState({
      ...this.state,
      voucher: {
        ...this.state.voucher,
        image_ids: [ ...this.state.voucher.image_ids, image.id],
        images: [...this.state.voucher.images, image]
      }
    });
  }
  handleDeleteFile = (value) =>{
    this.props.deleteImage(value.id)
      .then(response => {
        this.deleteFile(value);
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  deleteFile = (value) => {
    var arrayImages = this.state.voucher.images, 
      indexImage = arrayImages.indexOf(value);
      arrayImages.splice(indexImage, 1);
    var arrayImageIds = this.state.voucher.image_ids, 
      indexImageId = arrayImageIds.indexOf(value.id);
      arrayImageIds.splice(indexImageId, 1);

    this.setState({
      ...this.state,
      voucher: {
        ...this.state.voucher,
        image_ids: arrayImageIds,
        images: arrayImages
      }
    });
  }
// end
// Handle category change
  handleCategoryChange = (value) => {
    this.setState({
      ...this.state,
      store: {
        ...this.state.store,
        category_id: value
      },
      currentStep: 1
    });
  }
// end
// Handle render component when step change
  showStep = () => {
    switch(this.state.currentStep){
      // case -1:
      //   return(
      //     <VoucherInfoFields
      //       handleRegionSelectChange={this.handleRegionSelectChange}
      //       voucherFields={this.state.voucher}
      //       voucherErrors={this.state.voucherErrors}
      //       handleChange={this.handleVoucherFieldsChange}
      //       handleSubmit={this.handleSubmit}
      //       previousStep={this.previousStep}
      //       handleDateFieldChange={this.handleDateFieldChange}

      //       approved_regions={this.state.voucher.approved_regions_attributes}
      //       storeFields={this.state.store}
      //       storeErrors={this.state.storeErrors}
      //       handleStoreFieldsChange = {this.handleStoreFieldsChange}
      //       handleRegionSelectChange={this.handleRegionSelectChange}
      //       handleStoreAddressChanged={this.handleStoreAddressChanged}
      //       regions = {this.props.regions}
      //       getRegions={this.props.getRegions}
      //     />
      //   )
      // case -2:
      //   return(
      //     <StoreFields
      //       approved_regions={this.state.voucher.approved_regions_attributes}
      //       fields={this.state.store}
      //       handleChange={this.handleStoreFieldsChange}
      //       handleAddressChanged={this.handleStoreAddressChanged}
      //       handleSubmit={this.handleSubmit}
      //       errors={this.state.storeErrors}
      //       previousStep={this.previousStep}
      //       handleRegionSelectChange={this.handleRegionSelectChange}
      //       regions = {this.props.regions}
      //       getRegions={this.props.getRegions}
      //     />
      //   )
      case 0:
        return(
          <CategoryFields 
            categories={this.props.categories}
            getCategories={this.props.getCategories}
            isLoading={this.props.isCategoryLoading}
            categoryID={this.state.store.category_id}
            handleCategoryChange={this.handleCategoryChange}
          />
        );
      case 1:
        return(
          <VoucherInfoFields
            handleRegionSelectChange={this.handleRegionSelectChange}
            voucherFields={this.state.voucher}
            voucherErrors={this.state.voucherErrors}
            handleChange={this.handleVoucherFieldsChange}
            handleSubmit={this.handleSubmit}
            previousStep={this.previousStep}
            handleDateFieldChange={this.handleDateFieldChange}

            approved_regions={this.state.voucher.approved_regions_attributes}
            storeFields={this.state.store}
            storeErrors={this.state.storeErrors}
            handleStoreFieldsChange ={this.handleStoreFieldsChange}
            handleRegionSelectChange={this.handleRegionSelectChange}
            handleStoreAddressChanged={this.handleStoreAddressChanged}
            regions={this.props.regions}
            getRegions={this.props.getRegions}
          />
        )
      case 2:
        return(
          <VoucherMoreInfoFields
            fields={this.state.voucher}
            errors={this.state.voucherErrors}
            handleChange={this.handleVoucherFieldsChange}
            handleAddressChanged={this.handleVoucherAddressChanged}
            handleSubmit={this.handleSubmit}
            previousStep={this.previousStep}
            handleFileFieldChange={this.handleFileFieldChange}
            handleDeleteFile={this.handleDeleteFile}
            handleRadioBtnChange={this.handleRadioBtnChange}
          />
        )
      default:
        return(
          <div className='mt-3'>
            <a className="link-to-homepage btn red" href='/'>
              Trở về trang chủ
            </a>
          </div>
        )
    }
  }
  render(){
    const currentStep = this.state.currentStep
    return(
      <div className="new-voucher container">
        <div className='row'>
          {currentStep > 0 && currentStep < 3 && 
          <a className="m-2" onClick={this.previousStep.bind(this)}> 
            <i className="material-icons float-left">keyboard_arrow_left</i></a>}
          {this.showStep()}
        </div>
      </div>
    );      
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  isCategoryLoading: state.categories.isLoading,
  categories: state.categories.categories,
  regions: state.regions.regions,
  isRegionLoading: state.regions.isLoading
})

export default connect(mapStateToProps, {
    createVoucher,
    getCategories, 
    createImage,
    deleteImage,
    updateVoucher
})(VoucherFormPage)
