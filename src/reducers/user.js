import * as UserActionType from '../actiontypes/user';

const initialState = {
  accessToken: '',
  currentUser: {}
}

export default function User(state = initialState, action){
  switch(action.type){
    case UserActionType.LOGGED_IN:
      console.log(action.data);
      return {
        ...state,
        accessToken: action.userData.access_token,
        currentUser: action.userData.user
      }
    default:
      return state;
  }
}