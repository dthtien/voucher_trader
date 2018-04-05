import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import {VoucherValidation as validate} from '../../../validates';

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

class NewVoucherForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit = values => {
    this.props.createVoucher(values)
      .then(response => {
         this.props.addFlashMessage({
          type: 'success',
          text: response.data.message
        });

        this.context.router
          .history.push(`/vouchers/${response.data.voucher.id}`);
        console.log(response);
      })
      .catch(error => {
        const response = error.response;

        this.props.addFlashMessage({
          type: 'warning',
          text: response.data.message
        });

        if (response.status === 401) {
          this.context.router.history.push('/login');
        }
      })
  };

  render(){
    const {handleSubmit} = this.props;

    return(
        <div className="new-voucher">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="description" type="text" 
              component={renderInput} label="Description" />
            <Field name="kind" type="number" 
              component={renderInput} label="Type" />
            <button type="submit" className="btn btn-success">Create</button>
          </form>
        </div>
    );
  }
}

export default reduxForm({ 
  form: 'NewVoucherForm',
  validate
})(NewVoucherForm);