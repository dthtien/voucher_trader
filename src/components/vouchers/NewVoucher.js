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
          New Voucher
        </h1>
        <div className="new-voucher">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="description" type="text" 
              component={renderInput} label="Description" />
            <Field name="kind" type="number" 
              component={renderInput} label="Type" />
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