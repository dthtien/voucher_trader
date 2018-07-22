import React, { Component } from "react";
import '../../resources/cart.scss'
import { FormattedDate } from 'react-intl';
import NumberToCurrency from '../shared/NumberToCurrency';

class CartItem extends Component {
  render() {
    const { quantity, name, price, images, isReadOnly, voucher, isShowSellerInfo} = this.props;
    const {seller} = voucher;
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
              <p className='label'>
                <strong>Thời gian sử dụng: </strong>
                <span className="font-weight-bold">
                  <FormattedDate
                    value={voucher.date_start}
                    className='ml-2'
                    year='numeric'
                    month='long'
                    day='2-digit'
                  />
                </span>
                <span> đến </span>
                <span className="ml-1 font-weight-bold">
                  <FormattedDate
                    value={voucher.date_end}
                    className='ml-2'
                    year='numeric'
                    month='long'
                    day='2-digit'
                  />
                </span>
              </p>
            </div>
            { 
              isShowSellerInfo && 
              <div className="product-line-info">
                <p className='label'>
                  Thông tin người bán: {seller.name}
                </p>
                <p className="label">
                  Email: {seller.email}
                </p>
                <p className="label">
                  Số điện thoại: {seller.phone_number}
                </p>
              </div>
            }
          </div>
          <div className="product-line-grid-right product-line-actions col-md-5 col-xs-12">
            <div className="row">
              <div className={!isReadOnly ? "col-md-10 col-xs-6" : "col-md-12 col-xs-6"}>
                <div className="row">
                  <div className="col-md-6 col-xs-6 qty">
                    {!isReadOnly ?
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
                      : <strong  style={{ display: 'flex', alignItems: 'center',justifyContent:'center' ,color : '#aa6949'}}>S.L :{quantity}</strong>
                    }
                  </div>
                  <div className="col-md-6 col-xs-2 price">
                    <span className="product-price">
                      <strong>
                        <NumberToCurrency value={(+price) * (+quantity) } />
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
              {!isReadOnly && 
                <div className="col-md-2 col-xs-2 text-xs-right">
                  <div className="cart-line-product-actions">
                    <div className="remove-from-cart" onClick={this.props.onClickRemoveCartItem}>
                      <i className="fa fa-trash" />
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default CartItem;
