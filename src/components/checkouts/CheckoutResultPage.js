import React, { Component } from 'react';
import querystring from 'querystringify';
import {connect} from 'react-redux';
import qs from 'qs';
import md5 from 'md5';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import {sortObject} from '../utils/utils';
import { fetchCart } from '../../actions/cart.js'
import {createPayment} from '../../actions/payments';

class CheckoutResultPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      cart_id: localStorage.getItem("cart_id") || null,
      checkoutResult: ''
    }
  }
  componentDidMount(){
    if (!this.props.isAuthenticate) {
      toast.error("Bạn phải đăng nhập trước!")
      this.props.history.push('/login');
    }else{
      this.props.fetchCart();
    }

    var response = querystring.parse(this.props.location.search)
    if (isEmpty(response)) {
      toast.error("Không tìm thấy trang");
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
    console.log(signData)
    console.log(response)
    var checkSum = md5(signData)
    console.log(checkSum);
    if (checkSum === secureHash) {
      var responseCode = response.vnp_ResponseCode;

      if (responseCode === '00') {
        const params ={
          cart_id: this.state.cart_id,
          payment: Object.assign({},response),
          secure_hash: secureHash
        }
        console.log(params);
        this.props.createPayment(params)
        .then(response => {
          this.setState({
            checkoutResult: "Thanh toán thành công"
          })
        })
        .catch(error => {
          this.setState({
            checkoutResult: "Thanh toán thất bại"
          });
        })

      } else {
        this.setState({
          checkoutResult: "Thanh toán thành công"
        });
      }
    } else {
      toast.error("Không tìm thấy trang")
      this.props.history.push('/');
    }
  }
  render() {
    return (
      <div className="container text-center">
        <h1>Checkout result page</h1>
        <p>{this.state.checkoutResult}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  isAuthenticate: state.users.isAuthenticate,
  currentUser: state.users.currentUser, 
})
export default connect(mapStateToProps, {fetchCart, createPayment})
(CheckoutResultPage);
