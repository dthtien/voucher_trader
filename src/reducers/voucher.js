import * as VoucherActionType from '../actiontypes/voucher';

const initialState ={
  all: [],
  voucher: null,
  loading: true
}

export default function Voucher(state = initialState, action){
  switch(action.type){
    case VoucherActionType.GET_VOUCHERS:
      if (typeof action.payload !== 'undefined') {
        return {...state, all: action.payload.data.vouchers, loading: false};
      } else {
        return {...state, loading: true};
      }
    case VoucherActionType.GET_VOUCHER:
      if (typeof action.payload !== 'undefined') {
        return {...state, voucher: action.payload.data.voucher, loading: false};
      } else {
        return {...state, loading: true};
      }
    default:
      return state;
  }
}