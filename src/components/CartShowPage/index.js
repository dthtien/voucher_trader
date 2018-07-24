import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getCart } from '../../actions/cart';
import CartItem from "../Cart/CartItem"; 
import Spinner from "../shared/Spinner";
import isEmpty from 'lodash/isEmpty';
import CartInfo from './CartInfo';
import ShippingInfo from './ShippingInfo';

class CartShowPage extends Component {
  componentDidMount(){
    const id = this.props.match.params.id;
    this.props.getCart(id);
  }

  componentWillReceiveProps(nextProps){
    const {cart, currentUser} = nextProps;
    if (!cart.shipping || cart.user_id !== currentUser.id) {
      this.props.history.push('/')
    }
  }

  renderCartItem = () => {
    if (!this.props.isLoading) {
      const cartItems  = this.props.cart.cart_items;
      return cartItems.map((cartItem, index) => {
        return (
          <CartItem
            key={"cart-item" + index}
            price={cartItem.price || 0}
            quantity={cartItem.quantity || 0}
            voucher={cartItem.voucher}
            name={cartItem.voucher.name || ""}
            images={!isEmpty(cartItem.voucher.images) ? cartItem.voucher.images[0] : {}}
            isReadOnly={true}
            isShowSellerInfo={true}
          />
        );
      });
    } else {
      return <Spinner />;
    }
  };

  render() {
    const {cart, isLoading} = this.props;
    if (isLoading) {
      return (<Spinner />)
    } else {
      return (
        <div className="container-page-shipper">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-12 col-sm-12 top-shipping">
                <h4 className="title-page">Giỏ hàng của bạn</h4>
              </div>
              <CartInfo
                totalPrice={cart.total_price}
                totalQuantity={cart.cart_items.length}
              />
              <div className="col-sm-12 col-md-8">
                <div className="cart-overview js-cart">
                  <ul className="cart-items">{this.renderCartItem()}</ul>
                </div>
              </div>
              <div className="col-sm-12 col-md-4 pl-0">
                <div className='shipping-form text-center font-weight-bold'>
                  {cart.shipping && <ShippingInfo
                    shipping={cart.shipping}
                    payType={cart.kind} 
                  />}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
    }
  }
}
const mapStateToProps = (state) =>({
  cart: state.cart.cart,
  isLoading: state.cart.isLoading,
  error: state.cart.error,
  currentUser: state.users.currentUser,
  isAuthenticate: state.users.isAuthenticate
})
export default connect(mapStateToProps, {getCart})(CartShowPage);
