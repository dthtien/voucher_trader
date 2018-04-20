import * as UserActionType from '../actiontypes/user';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  currentUser: {},
  isAuthenticate: false
}

export default function User(state = initialState, action){
  switch(action.type){
    case UserActionType.LOGGED_IN:
      return {
        ...state,
        isAuthenticate: !isEmpty(action.user),
        currentUser: action.user
      }
    default:
      return state;
  }
}