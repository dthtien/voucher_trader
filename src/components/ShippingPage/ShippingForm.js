import React, { Component } from 'react';
import { toast } from "react-toastify";
import PlacesWithStandaloneSearchBox from '../shared/PlacesWithStandaloneSearchBox';
import TextFieldGroup from '../shared/TextFieldGroup';

class ShippingForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      direct_contact: false,
      shipping_address: '',
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const cart_id = localStorage.getItem("cart_id")

    if (!cart_id) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.shipping.shippingEmpty === false) {
      this.props.history.push(`/checkout/result?cart_id=${localStorage.getItem("cart_id")}`);
    }


  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { shipping_address, direct_contact } = this.state;
    
    if(!direct_contact && !shipping_address){
      toast.warn("Bạn chưa nhập địa chỉ nhận !");
      return;
    }

    //for online version

    const shipping = {
      direct_contact: true,
      shipping_address: shipping_address
    }

    const params = {
      shipping: shipping,
      cart_id: localStorage.getItem("cart_id")
    }
    // end
    ////for local version
    // const params = {
    //   shipping: this.state,
    //   cart_id: localStorage.getItem("cart_id")
    // }

    this.props.createShipping(params).then((result) => {
      console.log("result => ", result);
      const { data } = result;
      if(data && data.status === 'success'){
        ////for local version
        // if(!direct_contact){
        //   this.props.history.push('/checkout');
        //   return;
        // }

        localStorage.removeItem("cart_id");
        localStorage.removeItem("list_cart_item");
        this.props.history.push(`/checkout/result?cart_id=${params.cart_id}`);
      }
    }).catch(error => {
      console.log("error => ", error)
    })
  }
  
  handleAddressChanged = (text) => {
    this.setState({
      ...this.state,
      shipping_address: text
      }
    );
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  } 

  handleRadioBtnChange = (value) => {
    this.setState({
      ...this.state,
      direct_contact: value
    });
  }

  render() {
    return (
      <div className='shipping-form'>
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup 
            name='direct_contact'
            type='radio'
            label="Liên hệ trực tiếp"
            value={this.state.direct_contact}
            handleChange={this.handleRadioBtnChange}
          />

          {
            !this.state.direct_contact && <PlacesWithStandaloneSearchBox
            loadingElement={<div style={{ height: `100%` }}/>}
            name='shipping_address'
            label='Địa chỉ nhận:'
            handleAddressChanged={this.handleAddressChanged}
            value={this.state.shipping_address}
            handleChange={this.handleChange}
            error={this.state.errors.shipping_address}
          />
        }
        <div className='text-center'>
          <button className="btn red">
            Tiến hành thanh toán
          </button>
        </div>
        </form>
      </div>  
    );
  }
}

export default ShippingForm;
