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
            loadingElement={<div style={{ height: `100%` }}/>}
            name='address_receiver'
            label='Địa chỉ nhận:'
            handleAddressChanged={this.props.handleAddressChanged}
            value={this.props.fields.address_receiver}
            handleChange={this.props.handleChange}
            error={this.props.errors.address_receiver}
          />
          <TextFieldGroup 
            name='image'
            type='file'
            label='Ảnh'
            value={this.props.fields.images}
            handleDeleteFile={this.props.handleDeleteFile}
            handleChange={this.props.handleFileFieldChange}
          />
        </div>
      );
    }
  }

  render(){
    return(
      <div className='col-md-8 offset-md-2 mt-3'>
        <h5 className="mb-3 ml-0 title-category-voucher text-center">
          Mời bạn điền thêm thông tin
        </h5>
        <form className="ml-2" onSubmit={this.props.handleSubmit.bind(this)}>
          <TextFieldGroup 
            name='post_to_facebook'
            type='radio'
            label="Đăng lên facebook"
            value={this.props.fields.post_to_facebook}
            handleChange={this.props.handleRadioBtnChange}
          />
          {this.renderWithVoucherType()}
          <div className="text-center">
            <button 
              className="btn btn-warning m-2"
              onClick={this.props.previousStep.bind(this)}
            >Privious Step </button>
            <button className="btn btn-primary btn-red">Next Step</button>
          </div>
        </form>
      </div>
    );
  }
}



