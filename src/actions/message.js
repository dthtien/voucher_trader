import * as MessageActionType from '../actiontypes/message';

export const addFlashMessage = message => {
  return{
    type: MessageActionType.ADD_FLASH_MESSAGE,
    message
  }
}