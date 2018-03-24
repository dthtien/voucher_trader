import * as VoucherActionType from '../actiontypes/voucher';
import axios from 'axios';

const API_URL = 'http://localhost:6060/api/v1';

export const getVouchers = () => {
  const request = axios.get(`${API_URL}/vouchers`);

  return {
    type: VoucherActionType.GET_VOUCHERS,
    payload: request
  };
};

export const createVoucher = (props, callback) => {
  const request = axios.post(`${API_URL}/vouchers`, props).then(callback);

  return {
    type: VoucherActionType.CREATE_VOUCHER,
    payload: request
  };
};