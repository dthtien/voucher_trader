import * as UserActionType from '../actiontypes/user';
import setAuthorizationToken from '../config/setAuthorizationToken';
import axios from 'axios';

const API_URL = 'http://localhost:6060/api/v1';

export const signup = (userData) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/users/signup`, {user: userData});
  } 
}

export const login = (userData) => {
  return (dispatch) => {
    return axios.post(`${API_URL}/users/login`, {user: userData});
  }
}

export const loggedIn = (userData) => {
  const token = userData.access_token
  localStorage.setItem('accessToken', token);
  setAuthorizationToken(token);

  return {
    type: UserActionType.LOGGED_IN,
    userData 
  }
}

