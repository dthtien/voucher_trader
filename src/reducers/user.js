import * as UserActionType from '../actiontypes/user';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  currentUser: {},
  isAuthenticate: false,
}

export default function User(state = initialState, action){
  switch(action.type){
    case UserActionType.LOGGED_IN:
      return {
        ...state,
        isAuthenticate: !isEmpty(action.user),
        currentUser: action.user,
      }
    case UserActionType.RATING:
      return {
        ...state,
      }
    case UserActionType.FETCH_USER_PROFILE_START:
      return {
        ...state,
        isLoading : true,
        error : null,
      }
    case UserActionType.FETCH_USER_PROFILE_ERROR:
      return {
        ...state,
        isLoading : false,
        error : true
      }
    case UserActionType.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        error : null,
        isLoading : false,
        dataUser : action.dataUser || {}
      }
    default:
      return state;
  }
}