import * as MessageActionType from '../actiontypes/message';

export const addFlashMessage = message => {
  return{
    type: MessageActionType.ADD_FLASH_MESSAGE,
    message
  }
}
export const deleteFlashMessage = id => {
  return{
    type: MessageActionType.DELETE_FLASH_MESSAGE,
    id
  }
}