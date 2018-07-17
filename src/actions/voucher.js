import * as VoucherActionType from '../actiontypes/voucher';
import axios from 'axios';

import {apiLinkDev as API_URL} from '../config/apiLink';

export const getVouchers = (query = {}) => {
  const q = query.q || "", cat = query.cat || "", page = query.page || "";
  return (dispatch) => {
    dispatch({type: VoucherActionType.GET_VOUCHERS})
    axios.get(`${API_URL}/vouchers?q=${q}&cat=${cat}&page=${page}`)
      .then(response => {
        dispatch({type: VoucherActionType.GET_VOUCHERS, payload: response})
      })
      .catch(error => {
        dispatch({type: VoucherActionType.GET_VOUCHERS, payload: error});
      });    
  }
};

export const createVoucher = (props) => {
  return (dispatch) => {
    const params = {
      voucher: props.voucher,
      store: props.store
    }
    return axios.post(`${API_URL}/vouchers`, params);
  }
};
export const getNewestVouchers = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/vouchers/newest`)
      .then(response => {
        dispatch({type: VoucherActionType.GET_VOUCHERS, payload: response})
      })
      .catch(error => {
        dispatch({type: VoucherActionType.GET_VOUCHERS, payload: error});
      });    
  }
}

export const getVoucher = (id) => {
  return (dispatch) => {
    dispatch({type: VoucherActionType.GET_VOUCHER})
    axios.get(`${API_URL}/vouchers/${id}`)
      .then(response => {
        dispatch({type: VoucherActionType.GET_VOUCHER, payload: response})
      })
      .catch(error => {
        dispatch({type: VoucherActionType.GET_VOUCHER, payload: error});
      });    
  }
}

export const deleteVoucher = (id, callback) => {
  const request = axios.delete(`${API_URL}/vouchers/${id}`).then(callback);

  return {
    type: VoucherActionType.DELETE_VOUCHER,
    payload: request
  };
}

export const updateVoucher = (props) => {
  return (dispatch) => {
    const params = {
      voucher: props.voucher,
      store: props.store
    }
    
    return axios.patch(`${API_URL}/vouchers/${props.voucher.id}`, params);
  }
}; 

export const getVouchersFromCoordinates = (coords) => {
  const position = {
    latitude: coords.latitude, 
    longitude: coords.longitude
  }
  return (dispatch) => {
    axios.get(`${API_URL}/vouchers/nearby`, {params: position})
      .then(response => {
        dispatch({type: VoucherActionType.GET_VOUCHERS, payload: response})
      })
      .catch(error => {
        dispatch({type: VoucherActionType.GET_VOUCHERS, payload: error});
      });    
  }
};