import React, { Component } from 'react';
import dateFormat from 'dateformat';
import querystring from 'qs';
import md5 from 'md5';
import {sortObject} from '../utils/utils';

class CheckoutPage extends Component {
  getCheckoutLink = (e) => {
    e.preventDefault()

    const ENV = process.env;
    var vnpayUrl = ENV.REACT_APP_VNPAY_URL;
    var vnpayReturnUrl = ENV.REACT_APP_VNPAY_RETURN_URL;
    var vnpayTmnCode = ENV.REACT_APP_VNPAY_TMNCODE;
    var vnpayHashSecret = ENV.REACT_APP_VNPAY_HASHSECRET;
    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = '10000';
    var orderInfo = 'this is order infor'
    var orderType = 'topup'
    var locale = "vn"
    var currCode = 'VND'
    var vnp_Params = {};

    vnp_Params['vnp_Amount'] = amount;
    vnp_Params['vnp_Version'] = 2;
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_TmnCode'] = vnpayTmnCode;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_IpAddr'] = '::1';
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_ReturnUrl'] = vnpayReturnUrl;

    vnp_Params = sortObject(vnp_Params);
    var signData =  vnpayHashSecret + querystring.stringify(vnp_Params, { encode: false})

    var secureHash = md5(signData);
    vnp_Params['vnp_SecureHash'] = secureHash;
    vnp_Params['vnp_SecureHashType'] = 'MD5';
    vnpayUrl += '?' + querystring.stringify(vnp_Params, { encode: true });
    
    window.location.assign(vnpayUrl);
  }

  render() {
    return (
      <div>
        <a href='#' onClick={this.getCheckoutLink.bind(this)} >Checkout</a>
      </div>
    );
  }
}

export default CheckoutPage;
