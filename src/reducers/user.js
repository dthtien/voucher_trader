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
        ratingError: false,
      }
    case UserActionType.RATING_ERROR:
    return {
      ...state,
      ratingError: true,
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
    case UserActionType.UPDATE_USER_PROFILE_START:
      return {
        ...state,
        isLoading : true,
        error : null,
      }
    case UserActionType.UPDATE_USER_PROFILE_ERROR:
      return {
        ...state,
        isLoading : false,
        error : true,
        resultUpdate : 'error'
      }
    case UserActionType.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        error : null,
        isLoading : false,
        resultUpdate : 'success'
      }
    default:
      return state;
  }
}