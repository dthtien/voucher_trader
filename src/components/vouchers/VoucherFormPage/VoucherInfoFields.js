import React, {Component} from 'react';
import TextFieldGroup from '../../shared/TextFieldGroup';
import NumberToCurrency from '../../shared/NumberToCurrency';
import VoucherDescriptionImage from './VoucherDescriptionImage';
import StoreFields from './StoreFields';

export default class VoucherInfoFields extends Component{
  render(){
    const {
      voucherErrors, 
      voucherFields, 
      handleChange, 
      handleSubmit, 
      handleDateFieldChange,
      approved_regions,
      storeFields,
      storeErrors,
      handleRegionSelectChange,
      handleStoreAddressChanged,
      regions,
      getRegions,
      handleStoreFieldsChange
    } 
      = this.props;
    return(
      <div className="col col-md-12">
        <h4 className="mb-3 ml-0 text-center mt-3 font-weight-bold title-category-voucher">
          Đăng mã giảm giá</h4>
        <form className="ml-2" onSubmit={handleSubmit.bind(this)}>
          <div className="row">
            <div className="col col-md-6">
              <div className="form-group">
                <label className='mt-3'>Loại mã giảm giá:</label>
                <select name='kind' className='form-control' 
                  onChange={handleChange.bind(this)}
                  defaultValue={voucherFields.kind || ""}>
                  <option value="">Chọn</option>
                  <option value='e'>Voucher điện tử</option>
                  <option value='general'>Voucher giấy</option>
                </select>
                {voucherErrors.kind && <span className="text-danger">
                  {voucherErrors.kind}</span>}
              </div>

              <TextFieldGroup
                name='name'
                error={voucherErrors.name}
                type='text'
                label="Tên mã giảm giá (ví dụ: Mã giảm giá BigC 100.000 vnd)"
                value={voucherFields.name}
                handleChange={handleChange}
              />

              <TextFieldGroup 
                name='origin_price'
                type='number'
                label="Giá trị của voucher"
                value={voucherFields.origin_price}
                handleChange={handleChange}
                error={voucherErrors.origin_price}
              />
              <NumberToCurrency value={voucherFields.origin_price}/>

              <TextFieldGroup 
                name='price'
                type='number'
                label="Giá bạn muốn bán"
                value={voucherFields.price}
                handleChange={handleChange}
                error={voucherErrors.price}
              />
              <NumberToCurrency value={voucherFields.price} />

              <StoreFields
                approved_regions={approved_regions}
                fields={storeFields}
                handleChange={handleStoreFieldsChange}
                handleAddressChanged={handleStoreAddressChanged}
                errors={storeErrors}
                handleRegionSelectChange={handleRegionSelectChange}
                regions = {regions}
                getRegions={getRegions}
              />

              <TextFieldGroup
                name='date_start'
                error={voucherErrors.date_start}
                type='datepicker'
                label="Ngày hiệu lực"
                value={voucherFields.date_start}
                handleChange={handleDateFieldChange}
              />
              <TextFieldGroup
                name='date_end'
                error={voucherErrors.date_end}
                type='datepicker'
                label="Ngày hết hạn"
                value={voucherFields.date_end}
                handleChange={handleDateFieldChange}
              />
              <TextFieldGroup
                name='quantity'
                error={voucherErrors.quantity}
                type='number'
                label="Số lượng"
                value={voucherFields.quantity}
                handleChange={handleChange}
              />

              <TextFieldGroup
                name='description'
                error={voucherErrors.description}
                type='textarea'
                label="Mô tả"
                value={voucherFields.description}
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



