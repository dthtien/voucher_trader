import * as VoucherActionType from '../actiontypes/voucher';

const initialState ={
  all: [],
  voucher: null
}

export default function Voucher(state = initialState, action){
  switch(action.type){
    case VoucherActionType.GET_VOUCHERS:
      return {...state, all: action.payload.data};
    default:
      return state;
  }
}