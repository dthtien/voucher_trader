import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShippingForm from './ShippingForm';
import { fetchCart } from '../../actions/cart';
import CartItem from '../Cart/CartItem';
import { toast } from 'react-toastify';
import Spinner from '../shared/Spinner';
import isEmpty from 'lodash/isEmpty';

class ShippingPage extends Component {
  componentDidMount(){
    if (this.props.isAuthenticate) {
      this.props.fetchCart();
    } else {
      toast.error("Bạn phải đăng nhập trước");
      this.props.history.push('/login');
    }
  }
  renderCartItem = () =>{
    const {list_cart_item} = this.props
    if (list_cart_item.length > 0 ) {
      return list_cart_item.map((cart, index) =>{
        return (
          <CartItem 
            key={"cart-item" + index}
            price={cart.price || 0}
            quantity={cart.quantity || 0}
            name={cart.voucher.name || ''}
            images={!isEmpty(cart.voucher.images) ? cart.voucher.images[0] : {}}
            isReadOnly={true}
          />
        );
      });
    } else {
      return <Spinner />
    }
  }
  render() {
    return (
      <div className='container mt-5'>
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div className="cart-overview js-cart">
              <ul className="cart-items">
                {this.renderCartItem()}
              </ul>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <ShippingForm />
          </div>
        </div>
      </div>   
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.currentUser,
  isAuthenticate: state.users.isAuthenticate,
  list_cart_item: state.cart.list_cart_item
})

export default connect(mapStateToProps, {fetchCart})(ShippingPage);
