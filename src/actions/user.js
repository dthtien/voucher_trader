import * as UserActionType from '../actiontypes/user';
import axios from 'axios';

const API_URL = 'http://localhost:6060/api/v1';

export const signup = (userData) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/users/signup`, {user: userData});
  } 
}

export const loggedIn = (userData) => {
  return {
    type: UserActionType.LOGGED_IN,
    userData
  } 
}

