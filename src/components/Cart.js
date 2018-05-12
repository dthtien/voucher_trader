import React, { Component, PropTypes } from 'react';
import '../resources/cart.scss'

class Cart extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="container mt-4 mb-4">
         
          <div className="row">
            <div className="col-lg-12 col-xl-12 col-sm-12">
              <div className="card cart-container">
                <div className="card-block">
                  <h1 className="h1 text-uppercase">Shopping Cart</h1>
                </div>
                <hr />
                <div className="cart-overview js-cart">
                  <ul className="cart-items">
                    <li className="cart-item">
                      <div className="product-line-grid">
                        <div className="product-line-grid-left col-md-3 col-xs-4">
                          <span className="product-image media-middle">
                            <img className="img-fluid" src="http://via.placeholder.com/350x150http://via.placeholder.com/350x150" alt="Cras ornare tristique elit." />
                          </span>
                        </div>
                        
                        <div className="product-line-grid-body col-md-4 col-xs-8">
                          <div className="product-line-info">
                            <a className="label">Cras ornare tristique elit.</a>
                          </div>
                          
                          <div className="product-line-info">
                            <span className="value">$16.51</span>
                          </div>
                          
                          <br />
                          <div className="product-line-info">
                            <span className="label">Size:</span>
                            <span className="value">S</span>
                          </div>
                          <div className="product-line-info">
                            <span className="label">Color:</span>
                            <span className="value">Orange</span>
                          </div>
                        </div>
                        
                        <div className="product-line-grid-right product-line-actions col-md-5 col-xs-12">
                          <div className="row">
                            <div className="col-xs-4 hidden-md-up"></div>
                            <div className="col-md-10 col-xs-6">
                              <div className="row">
                                <div className="col-md-6 col-xs-6 qty">
                                  <div className="input-group bootstrap-touchspin">
                                    <input
                                      className="js-cart-line-product-quantity form-control"
                                      />
                                    <span className="input-group-btn-vertical">
                                    <button
                                      className="btn btn-touchspin js-touchspin js-increase-product-quantity bootstrap-touchspin-up"
                                      typeName="button">
                                      <i className="fa fa-angle-up"></i>
                                    </button>
                                      <button
                                        className="btn btn-touchspin js-touchspin js-decrease-product-quantity bootstrap-touchspin-down"
                                        type="button">
                                        <i className="fa fa-angle-down"></i>
                                      </button>
                                    </span>
                                  </div>
                                </div>
                                <div className="col-md-6 col-xs-2 price">
                                  <span className="product-price">
                                    <strong>  $33.02 </strong>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-2 col-xs-2 text-xs-right">
                              <div className="cart-line-product-actions">
                                <a className="remove-from-cart" rel="nofollow"
                                   href="http://demo.fieldthemes.com/ps_fashop/home4/en/cart?delete=1&amp;id_product=1&amp;id_product_attribute=1&amp;token=2946b31b5d0548493db70cbe4070457d"
                                   data-link-action="delete-from-cart" data-id-product="1" data-id-product-attribute="1"
                                   data-id-customization="">
                                  <i className="fa fa-trash"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="cart-item">
                      
                      <div className="product-line-grid">
                        <div className="product-line-grid-left col-md-3 col-xs-4">
                          <span className="product-image media-middle">
                            <img className="img-fluid" src="http://via.placeholder.com/350x150http://via.placeholder.com/350x150" alt="Cras ornare tristique elit." />
                          </span>
                        </div>
                        
                        <div className="product-line-grid-body col-md-4 col-xs-8">
                          <div className="product-line-info">
                            <a className="label">Cras ornare tristique elit.</a>
                          </div>
                          
                          <div className="product-line-info">
                            <span className="value">$16.51</span>
                          </div>
                          
                          <br />
                          <div className="product-line-info">
                            <span className="label">Size:</span>
                            <span className="value">S</span>
                          </div>
                          <div className="product-line-info">
                            <span className="label">Color:</span>
                            <span className="value">Orange</span>
                          </div>
                        
                        </div>
                        
                        <div className="product-line-grid-right product-line-actions col-md-5 col-xs-12">
                          <div className="row">
                            <div className="col-xs-4 hidden-md-up"></div>
                            <div className="col-md-10 col-xs-6">
                              <div className="row">
                                <div className="col-md-6 col-xs-6 qty">
                                  <div className="input-group bootstrap-touchspin">
                                    <input
                                      className="js-cart-line-product-quantity form-control"
                                    />
                                    <span className="input-group-btn-vertical">
                                    <button
                                      className="btn btn-touchspin js-touchspin js-increase-product-quantity bootstrap-touchspin-up"
                                      type="button">
                                      <i className="fa fa-angle-up"></i>
                                    </button>
                                      <button
                                        className="btn btn-touchspin js-touchspin js-decrease-product-quantity bootstrap-touchspin-down"
                                        type="button">
                                        <i className="fa fa-angle-down"></i>
                                      </button>
                                    </span>
                                  </div>
                                </div>
                                <div className="col-md-6 col-xs-2 price">
                                  <span className="product-price">
                                    <strong>  $33.02 </strong>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-2 col-xs-2 text-xs-right">
                              <div className="cart-line-product-actions">
                                <a className="remove-from-cart" rel="nofollow"
                                   href="http://demo.fieldthemes.com/ps_fashop/home4/en/cart?delete=1&amp;id_product=1&amp;id_product_attribute=1&amp;token=2946b31b5d0548493db70cbe4070457d"
                                   data-link-action="delete-from-cart" data-id-product="1" data-id-product-attribute="1"
                                   data-id-customization="">
                                  <i className="fa fa-trash"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-xl-12 col-sm-12 mt-4 mb-4">
              <a className="label continue-shopping" href="/">
                <i className="fa fa-angle-left"></i>Continue shopping
              </a>
            </div>
            <div className="cart-grid-right col-xs-12 col-lg-12">
          
              <div className="card cart-summary">
                <div className="cart-detailed-totals">
                  <div className="card-block">
                    <div className="cart-summary-line" id="cart-subtotal-products">
                      <span className="label js-subtotal">  1 item </span>
                      <span className="value">$16.51</span>
                    </div>
                    <div className="cart-summary-line" id="cart-subtotal-shipping">
                      <span className="label"> Shipping </span>
                      <span className="value">$7.00</span>
                    </div>
                  </div>
                  <hr />
                  <div className="card-block">
                    <div className="cart-summary-line cart-total">
                      <span className="label">Total (tax excl.)</span>
                      <span className="value">$23.51</span>
                    </div>
                
                    <div className="cart-summary-line">
                      <small className="label">Taxes</small>
                      <small className="value">$0.00</small>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="checkout cart-detailed-actions card-block">
                  <div className="text-center">
                    <a href="" className="btn btn-primary">Checkout</a>
              
                  </div>
                </div>
              </div>
              <div id="block-reassurance">
                <ul>
                  <li>
                    <div className="block-reassurance-item">
                      <img
                        src="http://via.placeholder.com/350x150http://via.placeholder.com/350x150"
                        alt="Security policy (edit with Customer reassurance module)"/>
                      <span className="h6">Security policy (edit with Customer reassurance module)</span>
                    </div>
                  </li>
                  <li>
                    <div className="block-reassurance-item">
                      <img
                        src="http://via.placeholder.com/350x150"
                        alt="Delivery policy (edit with Customer reassurance module)"/>
                      <span className="h6">Delivery policy (edit with Customer reassurance module)</span>
                    </div>
                  </li>
                  <li>
                    <div className="block-reassurance-item">
                      <img
                        src="http://via.placeholder.com/350x150"
                        alt="Return policy (edit with Customer reassurance module)" />
                      <span className="h6">Return policy (edit with Customer reassurance module)</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default Cart;
