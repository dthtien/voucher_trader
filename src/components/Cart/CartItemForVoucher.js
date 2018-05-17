import React, { Component } from "react";
import '../../resources/cart.scss'

class CartItemForVoucher extends Component {
  state = {
    cartValue :{
      quantity: 1, 
    }
  }
  _onChange = (obj) => {
    const cartValue = this.state.cartValue;
    if(obj.type === 'press_input'){
      cartValue.quantity = (+obj.value);
    } else if(obj.type === 'press_button_increase'){
      cartValue.quantity += 1;
    } else if(obj.type === 'press_button_degree' && + cartValue.quantity > 0){
      cartValue.quantity -= 1;
    }
    this.setState({ cartValue });
  };
  render() {
    const { quantity } = this.state.cartValue;
    return (
      <div className="cart-item col-md-12 col-lg-12 col-12">
        <div className="product-line-grid">
          <div className="product-line-grid-right product-line-actions col-md-12 col-xs-12">
            <div className="row">
              <div className="col-md-4 col-xs-4 qty" style={{justifyContent: 'center', display: 'flex', flexDirection:'column'}}>
                <div>Số lượng</div>
                <div className="input-group bootstrap-touchspin">
                  <button
                      onClick={() =>{
                        const obj = { 
                          type : 'press_button_degree'
                        };
                        this._onChange(obj);
                      }}
                      className="btn-decrease-product-quantity bootstrap-touchspin-down"
                      type="button"
                    >
                      -
                    </button>
                    <input 
                      className="product-quantity form-control" 
                      value={quantity}
                      type="number"
                      onChange={(e) =>{
                        const obj = { 
                          value : +e.target.value,
                          type : 'press_input'
                        };
                        this._onChange(obj);
                      }}
                    />
                    <button
                      onClick={() =>{
                        const obj = { 
                          type : 'press_button_increase'
                        };
                        this._onChange(obj);
                      }}
                      className="btn-increase-product-quantity bootstrap-touchspin-up"
                    >
                      +
                    </button>
                </div>
              </div>
              <div className="col-md-8 col-xs-8">
                <div className="cart-line-product-actions" style={{justifyContent : 'flex-start', alignItems: 'flex-end'}}>
                  <div className="add-to-cart" onClick={()=>{
                    if(typeof this.props.onAddItemToCart === 'function'){
                      this.props.onAddItemToCart(this.state.cartValue);
                    }
                  }}>
                    Thêm vào giỏ hàng
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItemForVoucher;
