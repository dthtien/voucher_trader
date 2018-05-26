import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import querystring from 'querystringify';
import {connect} from 'react-redux';
import qs from 'qs';
import md5 from 'md5';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import {sortObject} from '../utils/utils';
import { fetchCart } from '../../actions/cart.js'
import {createPayment} from '../../actions/payments';
import '../../resources/checkout.scss';

class CheckoutResultPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      cart_id: localStorage.getItem("cart_id") || null,
      checkoutResult: '',
      status : null,
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
          localStorage.removeItem("cart_id");
          localStorage.removeItem("list_cart_item");
          this.setState({
            checkoutResult: "Thanh toán thành công",
            status: 'success'
          });
        })
        .catch(error => {
          this.setState({
            checkoutResult: "Thanh toán thất bại",
            status: 'error'
          });
        })

      } else {
        localStorage.removeItem("cart_id");
        localStorage.removeItem("list_cart_item");
        this.setState({
          checkoutResult: "Thanh toán thành công",
          status: 'success'
        });
      }
    } else {
      toast.error("Không tìm thấy trang")
      this.props.history.push('/');
    }
  }
  render() {
    const { checkoutResult, status } = this.state;
    const color = {color : 
                    status === 'success' 
                    ? '#28a745' 
                    : status === 'error' 
                    ? '#dc3545'
                    : {} 
                  };
    return (
      <div className="container text-center checkout-result-page" style={{marginTop: 130}}>
        <h4 className="title-checkout-result-page">Thanh toán đơn hàng</h4>
        <p className="result-checkout-result-page" style={color}>
          { status === 'success'
            ? <i className="fa fa-check-circle" style={color}></i>
            : status === 'error'
            ? <i className="fa fa-exclamation-triangle" style={color}></i>
            : null
          }
          {checkoutResult}
        </p>
        <Link className="link-to-homepage" to='/'>Trở về trang chủ</Link>
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
