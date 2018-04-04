import * as MessageActionType from '../actiontypes/message';
import shortid from 'shortid';

const initialState = []

export default function Message(state = initialState, action){
  switch(action.type){
    case MessageActionType.ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ]
    default:
      return state;
  }
}