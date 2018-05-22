import React, { Component, PropTypes } from 'react';

class CheckoutPage extends Component {
  getCheckoutLink = ()=>{
    return 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1000000&vnp_Command=pay&vnp_CreateDate=20180522000553&vnp_CurrCode=VND&vnp_IpAddr=%3A%3A1&vnp_Locale=vn&vnp_OrderInfo=Thanh%20toan%20don%20hang%20thoi%20gian%3A%202018-05-22%2000%3A05%3A49&vnp_OrderType=topup&vnp_ReturnUrl=http%3A%2F%2Flocalhost%3A3000%2Fcheckout&vnp_TmnCode=OH524W7W&vnp_TxnRef=000553&vnp_Version=2&vnp_SecureHashType=MD5&vnp_SecureHash=4cb3a2b679363c893516769bbafded03'
  }
  render() {
    return (
      <div>
        <a href={this.getCheckoutLink()} >Checkout</a>
      </div>
    );
  }
}

export default CheckoutPage;
