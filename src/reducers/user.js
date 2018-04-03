import * as UserActionType from '../actiontypes/user';

const initialState ={
  message: null,
  data: null,
  accessToken: '',
  error: false
}

export default function User(state = initialState, action){
  switch(action.type){
    case UserActionType.SIGNUP:
      console.log(action.payload);
      return {...state, 
        error: false,
        accessToken: action.payload.data.access_token,
        data: action.payload.data.user }
    case UserActionType.SIGNUP_ERROR:
      return {...state,
        error: true,
        data: action.payload.response.data.error
      }
    default:
      return state;
  }
}


