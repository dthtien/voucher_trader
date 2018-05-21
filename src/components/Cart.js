import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import CartItem from '../components/Cart/CartItem';
import { connect } from 'react-redux';
import '../resources/cart.scss'
import Spinner from './shared/Spinner';
import { fetchCart, updateCartItem, deleteCartItem } from '../actions/cart';
import { Container, Modal, ModalBody, ModalHeader   } from 'mdbreact';

class Cart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        totalPrice : this._onCalcTotalPrice(props.list_cart_item) || 0,
        list_cart_item : [],
        modal : {
          isOpen : false,
          message : '',
          error: null,
        }
      };
    }
    componentDidMount(){
      this.props.fetchCart();
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps !== this.props && nextProps.list_cart_item !== this.props.list_cart_item && !isEmpty(nextProps.list_cart_item)){
        const totalPrice = this._onCalcTotalPrice(nextProps.list_cart_item);
        this.setState((prevState) => (
          { ...prevState , list_cart_item : nextProps.list_cart_item , totalPrice}
        ));
      }
    }
    _onChange = (obj) => {
      const list_cart_item = JSON.parse(JSON.stringify(...[this.state.list_cart_item]));
      const cartValue = list_cart_item[obj.index];
      this.setState((prevState) => (
        { 
          ...prevState, 
          modal : this.toggle({ isOpen: true, message : 'Thao tác đang được thực hiện', error: null })
        }
      ));
      if(obj.type === 'press_input'){
        cartValue.quantity = (+obj.value);
      } else if(obj.type === 'press_button_increase'){
        cartValue.quantity += 1;
      } else if(obj.type === 'press_button_degree' && + cartValue.quantity > 0){
        cartValue.quantity -= 1;
      }
      const totalPrice = this._onCalcTotalPrice(list_cart_item);
      let isError = false;
      if(cartValue.quantity > cartValue.voucher.quantity){
        this.setState((prevState) => (
          { 
            ...prevState, 
            modal : this.toggle({ isOpen: true, message : 'Số lượng quá số lượng voucher hiện có', error: true })
          }
        ));
        isError = true;
        return;
      }
      if(!isEmpty(cartValue) && cartValue.id && !isError){
        this.props.updateCartItem(cartValue.id,cartValue.quantity,list_cart_item, this.props.user).then(result => {
          if(result.type === 'cart/FETCH_CART_SUCCESS'){
            this.setState({ list_cart_item, totalPrice, modal : this.toggle({isOpen: false , message : ''}) });
            return;
          }
          this.setState((prevState) => (
            { 
              ...prevState, 
              modal : this.toggle({ isOpen: true, message : result.error || 'Đã có lỗi xảy ra', error: true })
            }
          ));
        });
      }
    };
    _onCalcTotalPrice = (list_cart_item) => {
      if(!list_cart_item || isEmpty(list_cart_item)) return 0;
      return list_cart_item.reduce((accumulator, currentValue, currentIndex, array) => {
        const priceItem = (currentValue.quantity * currentValue.price);
          return accumulator + priceItem;
      }, 0);
    }
    _onRemoveCartItem = ({index}) => {
      this.setState((prevState) => (
        { 
          ...prevState, 
          modal : this.toggle({ isOpen: true, message : 'Thao tác đang được thực hiện', error: null })
        }
      ));
      const list_cart_item = JSON.parse(JSON.stringify(...[this.state.list_cart_item]));
      const totalPrice = this._onCalcTotalPrice(list_cart_item);
      const item = {...list_cart_item[index]} || {};
      list_cart_item.splice(index, 1);
      if(!isEmpty(item) && item.id){
        this.props.deleteCartItem(item.id, list_cart_item, this.props.user).then(result => {
          if(result.type === 'cart/FETCH_CART_SUCCESS'){
            this.setState({ list_cart_item, totalPrice, modal : this.toggle({isOpen: false , message : '', error: true}) });
            return;
          }
          this.setState((prevState) => (
            { 
              ...prevState, 
              modal : this.toggle({ isOpen: true, message : 'Đã có lỗi xảy ra', error: true })
            }
          ));
        });
        
      }
    }
    toggle = ({isOpen, message, error}) => {
      return {
        isOpen : isOpen || false,
        message : message || '',
        error: error
      }
    }
    hideModal = () => {
      this.setState((prevState) => (
        { 
          ...prevState, 
          modal : this.toggle({ isOpen: false, message : '', error: null })
        }
      ));
    }
    render() {
      const { totalPrice, list_cart_item, modal } = this.state;
      return (
        <div className="container mt-4 mb-4">
          <Container>
            <Modal isOpen={modal.isOpen} >
            {
              modal.error === true &&
              <ModalHeader toggle={this.hideModal}>
                Thông báo
              </ModalHeader>
            }
              <ModalBody>
                {
                  modal.error !== true &&
                  <Spinner blue big />
                }
                <h3 className="text-danger text-center">{modal.message}</h3>
              </ModalBody>
            </Modal>
          </Container>
          <div className="row">
            <div className="col-lg-12 col-xl-12 col-sm-12">
              <div className="card cart-container">
                <div className="card-block">
                  <h1 className="h1 text-uppercase">Shopping Cart</h1>
                </div>
                <hr />
                <div className="cart-overview js-cart">
                  <ul className="cart-items">
                  {
                    !isEmpty(list_cart_item) && 
                    list_cart_item.map((cart, index) =>{
                      return (
                        <CartItem 
                          key={"cart-item" + index}
                          price={cart.price || 0}
                          quantity={cart.quantity || 0}
                          name={cart.voucher.name || ''}
                          images={!isEmpty(cart.voucher.images) ? cart.voucher.images[0] : {}}
                          onChange={(obj)=>{
                            this._onChange({ index, ...obj})
                          }}
                          onClickRemoveCartItem={()=>{
                            this._onRemoveCartItem({index});
                          }}
                        />
                      );
                    })
                  }  
                  
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
                      <span className="label js-subtotal">{list_cart_item.length} items</span>
                    </div>
                  </div>
                  <hr />
                  <div className="card-block">
                    <div className="cart-summary-line cart-total">
                      <span className="label">Total (tax excl.)</span>
                      <span className="value">{totalPrice}</span>
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
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list_cart_item: state.cart.list_cart_item,
    user: state.users.currentUser,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart : () => dispatch(fetchCart()), 
    deleteCartItem: (id,list_cart_item, user) => dispatch(deleteCartItem(id,list_cart_item, user)), 
    updateCartItem: (id,quantity,list_cart_item, user) => dispatch(updateCartItem(id,quantity,list_cart_item, user)), 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
