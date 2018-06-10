import React, {Component} from 'react';
import TextFieldGroup from '../../shared/TextFieldGroup';
import VoucherDescriptionImage from './VoucherDescriptionImage';
import { FormattedNumber } from 'react-intl';

export default class VoucherInfoFields extends Component{
  render(){
    const {errors, fields, handleChange, handleSubmit, 
      handleDateFieldChange} 
      = this.props;
    return(
      <div className="col col-md-12">
        <h4 className="mb-3 ml-0 text-center mt-3 font-weight-bold">
          Đăng mã giảm giá</h4>
        <form className="ml-2" onSubmit={handleSubmit.bind(this)}>
          <div className="row">
            <div className="col col-md-6">
              <div className="form-group">
                <label className='mt-3'>Loại mã giảm giá:</label>
                <select name='kind' className='form-control' 
                  onChange={handleChange.bind(this)}>
                  <option value="">Chọn</option>
                  <option 
                    value='e' 
                    selected={fields.kind === 'e'}
                  >E voucher</option>
                  <option 
                    value='general'
                    selected={fields.kind === 'general'}
                  >General voucher</option>
                </select>
                {errors.kind && <span className="text-danger">
                  {errors.kind}</span>}
              </div>
              <TextFieldGroup
                name='name'
                error={errors.name}
                type='text'
                label="Tên mã giảm giá (ví dụ: Mã gỉam gía BigC 100.000 vnd)"
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
              <FormattedNumber 
                value={fields.price} 
                style="currency" 
                currency="VND"/>

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
              <TextFieldGroup
                name='quantity'
                error={errors.quantity}
                type='number'
                label="Số lượng"
                value={fields.quantity}
                handleChange={handleChange}
              />

              <TextFieldGroup
                name='description'
                error={errors.deescription}
                type='textarea'
                label="Mô tả"
                value={fields.deescription}
                handleChange={handleChange}
              />
            </div>
            <div className="col col-md-6">
              <VoucherDescriptionImage />
            </div>
          </div>
          <div className="text-center mt-2">
            <button className="btn btn-red"> Bước tiếp theo </button>
          </div>
        </form>
      </div>
    );
  }
}



