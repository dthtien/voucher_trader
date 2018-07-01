import React, { Component } from 'react';
import VoucherFormPage from './VoucherFormPage';
import { getVoucher } from '../../actions/voucher';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Spinner from '../shared/Spinner';

class EditVoucherPage extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getVoucher(id);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.currentUser.id != nextProps.voucher.seller.id) {
      this.props.history.push('/')
    }
  }
  render() {
    const {voucher} = this.props;

    if (isEmpty(voucher)) {
      return <Spinner />
    } else {
      const { store} = voucher;
      console.log(store);
      
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
   currentUser: state.users.currentUser
  } 
};

export default connect(mapStateToProps, {
    getVoucher: getVoucher})(EditVoucherPage);
