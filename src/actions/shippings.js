import * as ShippingActionType from '../actiontypes/shipping';
import axios from "axios";
import {apiLinkDev as API_URL} from '../config/apiLink';

export const createShipping = (data) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/shippings`, data);
  }
};

export const getShipping = (id) => {
  return (dispatch) => {
    axios.get(`${API_URL}/carts/${id}/shipping`)
      .then(response => {
        dispatch({
          type: ShippingActionType.GET_SHIPPING_SUCCESS, 
          payload: response.data
        })
      })
      .catch(error => {
        dispatch({type: ShippingActionType.GET_SHIPPING_FALSE, payload: error.response.data});
      });    
  }
}