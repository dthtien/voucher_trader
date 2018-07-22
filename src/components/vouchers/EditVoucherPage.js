import React, { Component } from 'react';
import VoucherFormPage from './VoucherFormPage';
import { getVoucher } from '../../actions/voucher';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Spinner from '../shared/Spinner';

class EditVoucherPage extends Component {
  componentDidMount(){
    if (!this.props.isAuthenticate) {
      this.props.history.push('/');
    }
    
    const id = this.props.match.params.id;
    this.props.getVoucher(id);
  }

  componentWillReceiveProps(nextProps){
    const {currentUser, voucher} = nextProps;
    if (!isEmpty(voucher) && currentUser.id !== voucher.seller.id){
      this.props.history.push('/');
    }
  }
  render() {
    const {voucher} = this.props;

    if (isEmpty(voucher)) {
      return <Spinner />
    } else {
      const { store} = voucher;
      
      const data = {
        voucher: voucher,
        store: store
      }

      return (
        <VoucherFormPage data={data}  />
      );
    }
  }
}

const mapStateToProps = state => {
  return{
   loading: state.vouchers.loading,
   voucher: state.vouchers.voucher,
   currentUser: state.users.currentUser,
   isAuthenticate: state.users.isAuthenticate
  } 
};

export default connect(mapStateToProps, {
    getVoucher: getVoucher})(EditVoucherPage);
