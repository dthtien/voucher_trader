import * as VoucherActionType from '../actiontypes/voucher';
import axios from 'axios';

const API_URL = 'http://localhost:6060/api/v1';

export const getVouchers = () => {
  return (dispatch) => {
    dispatch({type: VoucherActionType.GET_VOUCHERS})
    axios.get(`${API_URL}/vouchers`)
      .then(response => {
        dispatch({type: VoucherActionType.GET_VOUCHERS, payload: response})
      })
      .catch(error => {
        dispatch({type: VoucherActionType.GET_VOUCHERS, payload: error});
      });    
  }
};

export const createVoucher = (props, callback) => {
  const request = axios.post(`${API_URL}/vouchers`, props).then(callback);

  return {
    type: VoucherActionType.CREATE_VOUCHER,
    payload: request
  };
};

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
  const request = axios.post(`${API_URL}/vouchers/${id}`).then(callback);

  return {
    type: VoucherActionType.DELETE_VOUCHER,
    payload: request
  };
}