import * as UserActionType from '../actiontypes/user';
import setAuthorizationToken from '../config/setAuthorizationToken';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import {apiLinkDev as API_URL} from '../config/apiLink';

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

export const logout = () => {
  return (dispatch) => {
    axios.delete(`${API_URL}/users/logout`);
    localStorage.removeItem('accessToken');
    setAuthorizationToken(false);
    dispatch(loggedIn());
  }
}

export const loggedIn = (accessToken) => {
  if (localStorage.accessToken !== accessToken ) {
    localStorage.setItem('accessToken', accessToken);
  }

  setAuthorizationToken(accessToken);
  console.log(accessToken);

  const user = jwt.decode(accessToken)

  return {
    type: UserActionType.LOGGED_IN,
    user
  }
}

export const facebookLogin = (data) => {
  return(dispatch) => {
    return axios.post(`${API_URL}/users/facebook_signup`, {user: data})
      .then(response => {
        dispatch(loggedIn(response.data.access_token));
      })
      .catch(error => {
        console.log(error.response);
      });
  }
}
