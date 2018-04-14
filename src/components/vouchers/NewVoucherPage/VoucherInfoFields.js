import React, {Component} from 'react';
import TextFieldGroup from '../../shared/TextFieldGroup';

export default class VoucherInfoFields extends Component{
  render(){
    return(
      <div>
        <h5 className="mb-3 ml-0">Voucher details</h5>
        <form className="ml-2" onSubmit={this.props.handleSubmit.bind(this)}>
          <div className="form-group">
            <label className='font-weight-bold mt-3'>Type</label>
            <select name='kind' className='form-control' onChange={this.props.handleChange.bind(this)}>
              <option value="">Select</option>
              <option value='e'>E voucher</option>
              <option value='general'>General voucher</option>
            </select>
          </div>

          <TextFieldGroup
            name='description'
            type='text'
            value={this.props.fields.description}
            handleChange={this.props.handleChange}
          />

          <TextFieldGroup 
            name='price'
            type='number'
            value={this.props.fields.price}
            handleChange={this.props.handleChange}
          />
          <button 
            className="btn btn-warning m-2"
            onClick={this.props.previousStep.bind(this)}
          >Privious Step</button>
          <button className="btn btn-primary">Next Step </button>
        </form>
      </div>
    );
  }
}



