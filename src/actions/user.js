import * as UserActionType from '../actiontypes/user';
import setAuthorizationToken from '../config/setAuthorizationToken';
import axios from 'axios';
import jwt from 'jsonwebtoken';

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

export const loggedIn = (accessToken) => {
  if (localStorage.accessToken !== accessToken ) {
    localStorage.setItem('accessToken', accessToken);
  }
  setAuthorizationToken(accessToken);
  const user = jwt.decode(accessToken)

  return {
    type: UserActionType.LOGGED_IN,
    user
  }
}

