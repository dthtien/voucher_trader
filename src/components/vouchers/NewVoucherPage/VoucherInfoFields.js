import React, {Component} from 'react';
import TextFieldGroup from '../../shared/TextFieldGroup';

export default class VoucherInfoFields extends Component{
  render(){
    const {errors, fields, handleChange, handleSubmit, previousStep, 
      handleDateFieldChange} 
      = this.props;
    return(
      <div className="col col-md-12">
        <h4 className="mb-3 ml-0 text-center mt-3 font-weight-bold">
          Đăng mã giảm giá</h4>
        <form className="ml-2" onSubmit={handleSubmit.bind(this)}>
          <div className="row">
            <div className="col col-md-6">
              <TextFieldGroup
                name='name'
                error={errors.name}
                type='text'
                label="Tên mã giảm giá"
                value={fields.name}
                handleChange={handleChange}
              />
              <TextFieldGroup 
                name='price'
                type='number'
                label="Giá trị"
                value={fields.price}
                handleChange={handleChange}
                error={errors.price}
              />

              <TextFieldGroup
                name='voucher_number'
                error={errors.VoucherInfoFields}
                type='text'
                label="Số voucher"
                value={fields.voucher_number}
                handleChange={handleChange}
              />

              <TextFieldGroup
                name='quantity'
                error={errors.quantity}
                type='number'
                label="Số lượng"
                value={fields.quantity}
                handleChange={handleChange}
              />
              
              <div className="form-group">
                <label className='mt-3'>Loại mã giảm giá:</label>
                <select name='kind' className='form-control' 
                  onChange={handleChange.bind(this)}>
                  <option value="">Chọn</option>
                  <option value='e'>E voucher</option>
                  <option value='general'>General voucher</option>
                </select>
                {errors.kind && <span className="text-danger">
                  {errors.kind}</span>}
              </div>
            </div>
            <div className="col col-md-6">
              <div className="time-use mt-3">
                <TextFieldGroup
                  name='date_start'
                  error={errors.date_start}
                  type='datepicker'
                  label="Ngày bắt đầu"
                  value={fields.date_start}
                  handleChange={handleDateFieldChange}
                />
                <TextFieldGroup
                  name='date_end'
                  error={errors.date_end}
                  type='datepicker'
                  label="Ngày kết thúc"
                  value={fields.date_end}
                  handleChange={handleDateFieldChange}
                />
              </div>

              <TextFieldGroup
                name='instruction'
                error={errors.instruction}
                type='textarea'
                label="Hướng dẫn sử dụng"
                value={fields.instruction}
                handleChange={handleChange}
              />
              <TextFieldGroup
                name='approved_condition'
                error={errors.approved_condition}
                type='textarea'
                label="Điều kiện áp dụng"
                value={fields.approved_condition}
                handleChange={handleChange}
              />
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-primary">Next Step </button>
          </div>
        </form>
      </div>
    );
  }
}



