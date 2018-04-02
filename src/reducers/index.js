import { combineReducers } from 'redux';
import VoucherReducer from './voucher';
import MessageReducer from './message';
import UserReducer from './user';

import {reducer as formReducer} from 'redux-form';

const allReducers = combineReducers({
  vouchers: VoucherReducer,
  messages: MessageReducer,
  users: UserReducer,
  form: formReducer
});

export default allReducers;