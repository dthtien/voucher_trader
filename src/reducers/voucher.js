import * as VoucherActionType from '../actiontypes/voucher';

const initialState ={
  all: [],
  voucher: {
  },
  store: {
  },
  totalVoucher: 0,
  loading: true
}

export default function Voucher(state = initialState, action){
  switch(action.type){
    case VoucherActionType.GET_VOUCHERS:
      if (typeof action.payload !== 'undefined') {
        const data = action.payload.data
        return {
          ...state, 
          all: data.vouchers, 
          totalVouchers: data.total_vouchers,
          loading: false,
        };
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