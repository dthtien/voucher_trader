import axios from "axios";
import {apiLinkDev as API_URL} from '../config/apiLink';

export const createShipping = (data) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/shippings`, data);
  }
};