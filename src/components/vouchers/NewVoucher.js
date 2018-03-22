import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import { createVoucher } from '../../actions/voucher';
import { bindActionCreators } from 'redux';

class NewVoucher extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit = (props) => {
    console.log(this.props);
    const createNewVoucher = bindActionCreators(createVoucher, this.props.dispatch);

    createNewVoucher(props)
      .then(() => {
        this.context.router.history.push('/');
      });
  };

  render(){
    const {fields: {content, price}, handleSubmit} = this.props;

    return(
      <div className="container">
        <h1 className="text-center m-3">
          New Voucher
        </h1>

        <div className="new-voucher">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className="form-group">
              <label>Content</label>
              <input type="text" className="form-control"placeholder="Enter voucher code" {...content}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your vouchers with anyone else.</small>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" className="form-control" placeholder="Price"{...price}/>
            </div>
            <button type="submit" className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'NewVoucherForm',
  fields: ['content', 'price']
}, null, {createVoucher})(NewVoucher);