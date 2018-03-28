import { combineReducers } from 'redux';
import VoucherReducer from './voucher';
import MessageReducer from './message';

import {reducer as formReducer} from 'redux-form';

const allReducers = combineReducers({
  vouchers: VoucherReducer,
  messages: MessageReducer,
  form: formReducer
});

export default allReducers;