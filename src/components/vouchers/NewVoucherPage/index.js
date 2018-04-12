import React, { Component }from 'react';
import { connect } from 'react-redux'; 
import NewVoucherForm from './NewVoucherForm';
import StoreFields from './StoreFields';
import VoucherInfoFields from './VoucherInfoFields';
import VoucherPostingOption from './VoucherPostingOption';
import {createVoucher} from '../../../actions/voucher';
import { addFlashMessage } from '../../../actions/message';

class NewVoucherPage extends Component {
  render(){
    return(
      <div className='row'>
        <div className='col-md-4 offset-md-4'>
          <h4 className="text-center m-2">Create voucher</h4>

          <StoreFields />
          <VoucherInfoFields />
          <VoucherPostingOption />
        </div>
      </div> 
    );
  }
}

export default connect (null, {createVoucher, addFlashMessage})(NewVoucherPage)