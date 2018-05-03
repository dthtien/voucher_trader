import * as UserActionType from "../actiontypes/user";
import setAuthorizationToken from "../config/setAuthorizationToken";
import axios from "axios";
import jwt from "jsonwebtoken";

import { apiLinkDev as API_URL } from "../config/apiLink";

export const signup = userData => {
  return dispatch => {
    return axios.post(`${API_URL}/users/signup`, { user: userData });
  };
};

export const login = userData => {
  return dispatch => {
    return axios.post(`${API_URL}/users/login`, { user: userData });
  };
};

export const logout = () => {
  return dispatch => {
    axios
      .delete(`${API_URL}/users/logout`)
      .then(response => {
        localStorage.removeItem("accessToken");
        setAuthorizationToken(false);
        dispatch(loggedIn());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const loggedIn = accessToken => {
  if (localStorage.accessToken !== accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  setAuthorizationToken(accessToken);
  const user = jwt.decode(accessToken);
  return {
    type: UserActionType.LOGGED_IN,
    user,
    accessToken
  };
};
export const rate = data => {
  return {
    type: UserActionType.RATING,
    data
  };
};
export const rating = data => {
  return dispatch => {
    axios
      .post(`${API_URL}/feedbacks`, { feedback: data })
      .then(response => {
        console.log("respond data", data);
        dispatch(rate(data));
      })
      .catch(error => {
        console.log("failed", error);
      });
  };
};
export const fetchUserProfileStart = () => {
  return {
    type: UserActionType.FETCH_USER_PROFILE_START
  };
};
export const fetchUserProfileError = () => {
  return {
    type: UserActionType.FETCH_USER_PROFILE_ERROR
  };
};
export const fetchUserProfileSuccess = ({dataUser}) => {
  return {
    type: UserActionType.FETCH_USER_PROFILE_SUCCESS,
    dataUser
  };
};
export const fetchUserProfile = id => {
  return dispatch => {
    dispatch(fetchUserProfileStart());
    axios
      .get(`${API_URL}/users/${id}`, )
      .then(response => {
        dispatch(fetchUserProfileSuccess({dataUser : response.data}));
      })
      .catch(error => {
        console.log("failed", error);
        dispatch(fetchUserProfileError());
      });
  };
};
