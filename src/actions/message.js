import * as MessageActionType from '../actiontypes/message';
import axios from 'axios';

const API_URL = 'http://localhost:6060/api/v1';

export const getMessage = (id) => {
  return (dispatch) => {
    dispatch({type: MessageActionType.GET_MESSAGE})
    axios.get(`${API_URL}/messages/${id}`)
      .then(response => {
        dispatch({type: MessageActionType.GET_MESSAGE, payload: response})
      })
      .catch(error => {
        dispatch({type: MessageActionType.GET_MESSAGE, payload: error});
      });    
  }
}

export const createMessage = (props) => {
  const request = axios.post(`${API_URL}/messages`, props);

  return{
    type: MessageActionType.CREATE_MESSAGE
  }
}