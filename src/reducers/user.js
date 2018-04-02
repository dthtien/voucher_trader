import * as UserActionType from '../actiontypes/user';

const initialState ={
  message: null,
  user: null,
  accessToken: '',
  loading: true
}

export default function User(state = initialState, action){
  switch(action.type){
    case UserActionType.SIGNUP:
      if (typeof action.payload !== 'undefined') {
        return {...state, 
          message: action.payload.data.message, 
          loading: false,
          user: action.payload.data.user
        };
      } else {
        return {...state, loading: true};
      }
    default:
      return state;
  }
}


