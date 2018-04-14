import React, {Component} from 'react';
import TextFieldGroup from '../../shared/TextFieldGroup';

export default class VoucherInfoFields extends Component{
  render(){
    console.log("errors",this.props.errors)
    const {errors, fields, handleChange, handleSubmit, previousStep} = this.props;
    return(
      <div>
        <h5 className="mb-3 ml-0">Voucher details</h5>
        <form className="ml-2" onSubmit={this.props.handleSubmit.bind(this)}>
          <div className="form-group">
            <label className='font-weight-bold mt-3'>Type</label>
            <select name='kind' className='form-control' 
              onChange={handleChange.bind(this)}>
              <option value="">Select</option>
              <option value='e'>E voucher</option>
              <option value='general'>General voucher</option>
            </select>
            {errors.kind && <span className="text-danger">
              {errors.kind}</span>}
          </div>

          <TextFieldGroup
            name='description'
            error={errors.description}
            type='text'
            value={fields.description}
            handleChange={handleChange}
          />

          <TextFieldGroup 
            name='price'
            type='number'
            value={fields.price}
            handleChange={handleChange}
            error={errors.price}
          />
          <button 
            className="btn btn-warning m-2"
            onClick={previousStep.bind(this)}
          >Privious Step</button>
          <button className="btn btn-primary">Next Step </button>
        </form>
      </div>
    );
  }
}



