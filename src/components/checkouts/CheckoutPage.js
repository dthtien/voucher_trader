import React, { Component } from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import querystring from "qs";
import md5 from "md5";
import { sortObject } from "../utils/utils";
import "../../resources/shipping.scss";
import { fetchCart, updateCartPaymentType } from "../../actions/cart";
import { toast } from "react-toastify";
import isEmpty from "lodash/isEmpty";
import "../../resources/checkout.scss";
import { FormattedNumber } from "react-intl";

class CheckoutPage extends Component {
  state = {
    initialTab : 0,
    submiting: false 
  }
  componentDidMount() {
    if (!this.props.isAuthenticate) {
      toast.error("Bạn phải đăng nhập trước");
      this.props.history.push("/login");
    }
  }
  handleCaclulate = () => {
    const { list_cart_item } = this.props;
    const obj = {
      total: 0,
      price: 0
    };
    if (!isEmpty(list_cart_item)) {
      list_cart_item.forEach(cart => {
        obj.total += cart.quantity;
        obj.price += cart.price;
      });
    }
    return obj;
  };
  getCheckoutLink = (e = null) => {
    // e.preventDefault();

    const ENV = process.env;
    var vnpayUrl = ENV.REACT_APP_VNPAY_URL;
    var vnpayReturnUrl = ENV.REACT_APP_VNPAY_RETURN_URL;
    var vnpayTmnCode = ENV.REACT_APP_VNPAY_TMNCODE;
    var vnpayHashSecret = ENV.REACT_APP_VNPAY_HASHSECRET;
    var date = new Date();

    var createDate = dateFormat(date, "yyyymmddHHmmss");
    var orderId = dateFormat(date, "HHmmss");
    var amount = "10000";
    var orderInfo = "this is order infor";
    var orderType = "topup";
    var locale = "vn";
    var currCode = "VND";
    var vnp_Params = {};

    vnp_Params["vnp_Amount"] = amount;
    vnp_Params["vnp_Version"] = 2;
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_TmnCode"] = vnpayTmnCode;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_IpAddr"] = "::1";
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_ReturnUrl"] = vnpayReturnUrl;

    vnp_Params = sortObject(vnp_Params);
    var signData =
      vnpayHashSecret + querystring.stringify(vnp_Params, { encode: false });

    var secureHash = md5(signData);
    vnp_Params["vnp_SecureHash"] = secureHash;
    vnp_Params["vnp_SecureHashType"] = "MD5";
    vnpayUrl += "?" + querystring.stringify(vnp_Params, { encode: true });
    window.location.assign(vnpayUrl);
  };
  handleChangeTab = ({initialTab}) =>{
    if(initialTab === 2){
      const { match } = this.props;
      let voucher_boughts = [];
      this.props.fetchVoucherBoughts(match.params.id).then(result => {
        if(result.data && result.data.vouchers){
          voucher_boughts = result.data.vouchers;
          console.log(voucher_boughts)
          this.setState({initialTab, voucher_boughts});
          return;
        }
      });
      
    }
    this.setState({initialTab});
  };
  onHandlePayment = () => {
    const cart_id = localStorage.getItem('cart_id');
    const type = this.state.initialTab === 0 
                 ? 'cod' 
                 : this.state.initialTab === 1
                 ? 'payment'
                 : null;
    if(!cart_id){
      toast.error("Chưa có thông tin giỏ hàng");
      return;
    }
    if(!type){
      toast.error("Chưa có thông tin phương thức thanh toán");
      return;
    }
    this.setState({submiting : true});
    updateCartPaymentType(cart_id,type).then(result => {
      this.setState({submiting : false});
      if(type !== 'cod'){
        this.getCheckoutLink();
      }
      return;
    }).catch(error => {
      this.setState({submiting : false});
      toast.error("Đã có lỗi thao tác !");
    })
  }
  render() {
    const infoListCart = this.handleCaclulate();
    const { initialTab, submiting } = this.state;
    return (
      <div className="container-page-checkout">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 col-sm-12 top-shipping">
              <h4 className="title-page">
                Vui lòng chọn phương thức thanh toán
              </h4>
            </div>
            <div className="col-sm-12 col-md-8">
              <div className="cart-overview js-cart">
                <div className="header-content-bottom">
                  <div
                    className={`item-header-content-bottom ${initialTab === 0 ? "active" : ""}`}
                    onClick={() => {
                      this.handleChangeTab({ initialTab: 0 });
                    }}
                  >
                    Thanh toán khi nhận hàng
                  </div>
                  <div
                    className={`item-header-content-bottom ${initialTab === 1 ? "active" : ""}`}
                    onClick={() => {
                      this.handleChangeTab({ initialTab: 1 });
                    }}
                  >
                    Thanh toán qua thẻ ngân hàng
                  </div>
                </div>
                {
                  initialTab > -1 &&
                  <div className="content-bottom">
                    <div className="text-checkout-normal">
                      {
                        initialTab === 0
                        ? 'Bạn có thể thanh toán bằng tiền mặt khi nhận hàng tại nhà'
                        : 'Thanh toán thông qua ngân hàng'
                      }  
                    </div>
                    <div className="btn-place-order-wrap">
                      <button disabled={submiting} style={{opacity : submiting ? 0.6 : 1}} className="btn-checkout-now" onClick={this.onHandlePayment}>Đặt hàng ngay</button>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className="col-sm-12 col-md-4 shipping-form">
              <div className="info-checkout-title">Thông tin đơn hàng</div>
              <div className="total-product">
                <span className="text-title-shipping">
                  Sản phẩm: {infoListCart.total}
                </span>
              </div>
              <div className="total-product">
                <span className="text-title-shipping">
                  Tổng tiền:
                  <FormattedNumber
                    value={infoListCart.price}
                    style="currency"
                    currency="VND"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    /* return (
      <div>
        <a href='#' onClick={this.getCheckoutLink.bind(this)} >Checkout</a>
      </div>
    ); */
  }
}
const mapStateToProps = state => ({
  isAuthenticate: state.users.isAuthenticate,
  list_cart_item: state.cart.list_cart_item
});
export default connect(mapStateToProps, { fetchCart })(CheckoutPage);
