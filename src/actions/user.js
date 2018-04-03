import * as UserActionType from '../actiontypes/user';
import axios from 'axios';

const API_URL = 'http://localhost:6060/api/v1';

export const signup = (props) => {
  return (dispatch) => {
    axios.post(`${API_URL}/users/signup`, {user: props})
      .then(response => {
        dispatch({type: UserActionType.SIGNUP, payload: response})
      })
      .catch(error => {
        dispatch({type: UserActionType.SIGNUP_ERROR, payload: error});
      });    
  } 
}

