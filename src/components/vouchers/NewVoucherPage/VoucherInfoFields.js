import React, {Component} from 'react';
import TextFieldGroup from '../../shared/TextFieldGroup';

export default class VoucherInfoFields extends Component{
  render(){
    const {errors, fields, handleChange, handleSubmit, previousStep} 
      = this.props;
    return(
      <div>
        <h4 className="mb-3 ml-0 text-center mt-3 font-weight-bold">
          Đăng mã giảm giá</h4>
        <form className="ml-2" onSubmit={handleSubmit.bind(this)}>
          <div className="form-group">
            <label className='font-weight-bold mt-3'>Loại mã giảm giá:</label>
            <select name='kind' className='form-control' 
              onChange={handleChange.bind(this)}>
              <option value="">Chọn</option>
              <option value='e'>E voucher</option>
              <option value='general'>General voucher</option>
            </select>
            {errors.kind && <span className="text-danger">
              {errors.kind}</span>}
          </div>

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
          <div className="time-use">
            <h5 className="mb-3">
              Thời gian sử  dụng
            </h5>
            <TextFieldGroup
              name='date_start'
              error={errors.date_start}
              type='datepicker'
              label="Ngày bắt đầu"
              value={fields.date_start}
              handleChange={handleChange}
            />
            <TextFieldGroup
              name='date_end'
              error={errors.date_end}
              type='datepicker'
              label="Ngày kết thúc"
              value={fields.date_end}
              handleChange={handleChange}
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


          <button className="btn btn-primary">Next Step </button>
        </form>
      </div>
    );
  }
}



