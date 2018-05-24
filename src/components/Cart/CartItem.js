import React, { Component } from "react";
import '../../resources/cart.scss'
import { FormattedNumber } from 'react-intl';

class CartItem extends Component {
  render() {
    const { quantity, name, price, images } = this.props;
    return (
      <li className="cart-item">
        <div className="product-line-grid">
          <div className="product-line-grid-left col-md-3 col-xs-4">
            <span className="product-image media-middle">
              <img className="img-fluid" src={images.url_origin || require('../../resources/default-image.jpg')} alt=""/>
            </span>
          </div>

          <div className="product-line-grid-body col-md-4 col-xs-8">
            <div className="product-line-info">
              <a className="label">{name}</a>
            </div>

            <div className="product-line-info">
              <span className="value">
                <FormattedNumber 
                  value={price}
                  style='currency' 
                  currency='VND'
                />
              </span>
            </div>
          </div>
          <div className="product-line-grid-right product-line-actions col-md-5 col-xs-12">
            <div className="row">
              <div className="col-xs-4 hidden-md-up" />
              <div className="col-md-10 col-xs-6">
                <div className="row">
                  <div className="col-md-6 col-xs-6 qty">
                    <div className="input-group bootstrap-touchspin">
                    <button
                        onClick={() =>{
                          if(typeof this.props.onChange === 'function'){
                            const obj = { 
                              type : 'press_button_degree'
                            };
                            this.props.onChange(obj);
                          }
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
                          if(typeof this.props.onChange === 'function'){
                            const obj = { 
                              value : +e.target.value,
                              type : 'press_input'
                            };
                            this.props.onChange(obj);
                          }
                        }}
                      />
                      <button
                        onClick={() =>{
                          if(typeof this.props.onChange === 'function'){
                            const obj = { 
                              type : 'press_button_increase'
                            };
                            this.props.onChange(obj);
                          }
                        }}
                        className="btn-increase-product-quantity bootstrap-touchspin-up"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-2 price">
                    <span className="product-price">
                      <strong>
                        <FormattedNumber 
                          value={(+price) * (+quantity) }
                          style='currency' currency='VND'
                        />
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-xs-2 text-xs-right">
                <div className="cart-line-product-actions">
                  <div className="remove-from-cart" onClick={this.props.onClickRemoveCartItem}>
                    <i className="fa fa-trash" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default CartItem;
