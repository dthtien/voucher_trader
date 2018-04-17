import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import {VoucherValidation as validate} from '../../../validates';
import DropDownSelect from '../../shared/DropDownSelect';
import ReduxInputGroup from '../../shared/ReduxInputGroup';

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
            <Field 
              name="description" 
              type="text" 
              component={ReduxInputGroup}
              label="Description" 
            />

            <Field 
              name="kind" 
              values={['e', 'general']}
              component={DropDownSelect}
              label="Type"
              className='form-control'
            />

            <div className="text-center mt-2">
              <button type="submit" className="btn btn-success">Create</button>
            </div>
          </form>
        </div>
    );
  }
}

export default reduxForm({ 
  form: 'NewVoucherForm',
  validate
})(NewVoucherForm);