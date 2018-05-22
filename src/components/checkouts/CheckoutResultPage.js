import React, { Component } from 'react';
import querystring from 'querystringify';
import qs from 'qs';
import md5 from 'md5';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import {sortObject} from '../utils/utils';

class CheckoutResultPage extends Component {
  componentDidMount(){
    var response = querystring.parse(this.props.location.search)
    if (isEmpty(response)) {
      toast.error("Page not found")
      this.props.history.push('/');
    } else {
      this.handleVnpayResponse(response);
    }
  }

  handleVnpayResponse = (response) => {
    var secureHash = response.vnp_SecureHash;
    const ENV = process.env;
    var vnpayTmnCode = ENV.REACT_APP_VNPAY_TMNCODE;
    var vnpayHashSecret = ENV.REACT_APP_VNPAY_HASHSECRET;

    response = sortObject(response);

    delete response.vnp_SecureHash;
    delete response.vnp_SecureHashType;

    var signData = vnpayHashSecret + qs.stringify(response, {encode: false})

    var checkSum = md5(signData)
    if (checkSum === secureHash) {
      var responseCode = response.vnp_ResponseCode;

      if (responseCode === '00') {
        console.log('success')
      } else {
        console.log('failed with right case')
      }
    } else {
      toast.error("Page not found")
      this.props.history.push('/');
    }
  }
  render() {
    // console.log('http://localhost:3000/checkout?vnp_Amount=10000&vnp_BankCode=NCB&vnp_BankTranNo=20180522225658&vnp_CardType=ATM&vnp_OrderInfo=this+is+order+infor&vnp_PayDate=20180522225644&vnp_ResponseCode=00&vnp_TmnCode=WWL6JHNV&vnp_TransactionNo=13088941&vnp_TxnRef=220500&vnp_SecureHashType=MD5&vnp_SecureHash=aa10e2bab4b60c6453d5e8bfe6790870');

    return (
      <h1>Checkout result page</h1>
    );
  }
}

export default CheckoutResultPage;
