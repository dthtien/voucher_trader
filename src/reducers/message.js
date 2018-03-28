import * as MessageActionType from '../actiontypes/message';

const initialState ={
  message: null,
  loading: true
}

export default function Message(state = initialState, action){
  switch(action.type){
    case MessageActionType.GET_MESSAGE:
      if (typeof action.payload !== 'undefined') {
        return {...state, message: action.payload.data.message, loading: false};
      } else {
        return {...state, loading: true};
      }
    default:
      return state;
  }
}