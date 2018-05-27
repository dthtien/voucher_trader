import * as ShippingActionType from '../actiontypes/shipping';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  shipping: {}
}

export default function Category(state = initialState, action){
  switch(action.type){
    case ShippingActionType.GET_SHIPPING_SUCCESS:
      return{
        ...state,
        shipping: action.payload.shipping,
        shippingEmpty: isEmpty(action.payload.shipping)
      }
    case ShippingActionType.GET_SHIPPING_FALSE:
      return{
        ...state,
        getShippingFalse: true
      }
    default:
    return state;
  }
}