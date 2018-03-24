import { combineReducers } from 'redux';
import VoucherReducer from './voucher';
import {reducer as formReducer} from 'redux-form';

const allReducers = combineReducers({
  vouchers: VoucherReducer,
  form: formReducer
});

export default allReducers;