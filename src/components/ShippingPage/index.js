import React, { Component } from "react";
import { connect } from "react-redux";
import ShippingForm from "./ShippingForm";
import { removeCartListItem } from "../../actions/cart";
import CartItem from "../Cart/CartItem";
import { toast } from "react-toastify";
import Spinner from "../shared/Spinner";
import isEmpty from "lodash/isEmpty";
import "../../resources/shipping.scss";
import { createShipping, getShipping} from '../../actions/shippings';
import NumberToCurrency from '../shared/NumberToCurrency';


class ShippingPage extends Component {
  componentDidMount() {
    if (this.props.isAuthenticate) {
      const cart_id = localStorage.getItem("cart_id");
      if (cart_id) {
        this.props.getShipping(cart_id);
      } else{
        toast.warning("Không tìm thấy trang");
        this.props.history.push("/");
      }
    } else {
      toast.error("Bạn phải đăng nhập trước");
      this.props.history.push("/login");
    }
  }

  renderCartItem = () => {
    const { list_cart_item } = this.props;
    if (list_cart_item.length > 0) {
      return list_cart_item.map((cart, index) => {
        return (
          <CartItem
            key={"cart-item" + index}
            price={cart.price || 0}
            quantity={cart.quantity || 0}
            name={cart.voucher.name || ""}
            voucher={cart.voucher}
            images={!isEmpty(cart.voucher.images) ? cart.voucher.images[0] : {}}
            isReadOnly={true}
          />
        );
      });
    } else {
      return <Spinner />;
    }
  };

  handleCaclulate = () => {
    const { list_cart_item } = this.props;
    const obj = {
      total : 0,
      price : 0
    };
    if(!isEmpty(list_cart_item)){
      list_cart_item.forEach((cart) => {
        obj.total += cart.quantity;
        obj.price += cart.price;
      })
    }
    return obj;
  }
  render() {
    const infoListCart = this.handleCaclulate();
    return (
      <div className="container-page-shipper">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 col-sm-12 top-shipping">
              <h4 className="title-page">Giỏ hàng của bạn</h4>
            </div>
            <div className="col-md-12 col-sm-12 top-shipping">
              <div className="total-product col-3 pl-0">
                <span className="text-title-shipping">Sản phẩm:  {infoListCart.total}</span>
              </div>
              <div className="total-product col-9">
                <span className="text-title-shipping">
                  Tổng tiền: 
                  <NumberToCurrency value={infoListCart.price} />
                </span>
              </div>
            </div>
            <div className="col-sm-12 col-md-8">
              <div className="cart-overview js-cart">
                <ul className="cart-items">{this.renderCartItem()}</ul>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 pl-0">
              <ShippingForm
                createShipping={this.props.createShipping}
                history={this.props.history}
                removeCartListItem={this.props.removeCartListItem}
                shipping={this.props.shipping}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.currentUser,
  isAuthenticate: state.users.isAuthenticate,
  list_cart_item: state.cart.list_cart_item,
  shipping: state.shipping
});
export default connect(mapStateToProps, 
  {createShipping, removeCartListItem, getShipping})(ShippingPage);
