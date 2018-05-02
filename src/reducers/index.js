import { combineReducers } from 'redux';
import VoucherReducer from './voucher';
import MessageReducer from './message';
import UserReducer from './user';
import CategoryReducer from './category';
// import RegionReducer from './region';

import {reducer as formReducer} from 'redux-form';

const allReducers = combineReducers({
  vouchers: VoucherReducer,
  messages: MessageReducer,
  users: UserReducer,
  categories: CategoryReducer,
  // regions: RegionReducer,
  form: formReducer
});

export default allReducers;