import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/voucher';
import {VoucherValidation as validate} from '../../validates';

const renderInput = field =>{
  const { input, label, type, meta: { touched, error, warning } } = field;
  return(
    <div className="form-group">
      <label>{label}</label>
      <input {...input} type={type} className="form-control" />
      {touched && ((error && <span className='text-danger mt-2'>{error}</span>) || 
        (warning && <span className='text-warning mt-2'>{warning}</span>))}
    </div>
  );
}

class NewVoucher extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit = values => {
    this.props.createVoucher(values, () =>{
      this.context.router.history.push('/')
    });
  };

  render(){
    const {handleSubmit} = this.props;

    return(
      <div className="container">
        <h1 className="text-center m-3">
          Đăng mã giảm giá
        </h1>
        <div className="new-voucher">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="name" type="text" 
              component={renderInput} label="Tên mã giảm giá" />
            <Field name="price" type="text" 
              component={renderInput} label="Giá trị" />
            <Field name="voucher_number" type="text" 
              component={renderInput} label="Số voucher" />
            <Field name="quantity" type="text" 
              component={renderInput} label="Số  lượng" />
            <div>
              <h3>Thời gian sử  dụng</h3>
              <Field name="date_start" type="text" 
              component={renderInput} label="Ngày bắt đầu " />
              <Field name="end_date" type="text" 
              component={renderInput} label="Ngày kết thúc" />
            </div>
            <Field name="instruction" type="text" 
              component={renderInput} label="Hướng dẫn sử dụng">
            <Field name="instruction" type="text" 
              component={renderInput} label="Hướng dẫn sử dụng">

            <button type="submit" className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    form: state.form
  };
}

NewVoucher = connect(mapStateToProps, actions)(NewVoucher);

export default reduxForm({ 
  form: 'NewVoucherForm',
  validate
})(NewVoucher);