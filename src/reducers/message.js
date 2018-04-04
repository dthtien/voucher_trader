import * as MessageActionType from '../actiontypes/message';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';


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
    case MessageActionType.DELETE_FLASH_MESSAGE:
      const index = findIndex(state, {id: action.id});
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }

      return state;
    default:
      return state;
  }
}