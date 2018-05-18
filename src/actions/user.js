import * as UserActionType from "../actiontypes/user";
import setAuthorizationToken from "../config/setAuthorizationToken";
import axios from "axios";
import jwt from "jsonwebtoken";

import { apiLinkDev as API_URL } from "../config/apiLink";
import { removeCartListItem } from "./cart";

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
  return (dispatch) => {
    axios.delete(`${API_URL}/users/logout`);
    localStorage.removeItem('accessToken');
    setAuthorizationToken(false);
    removeCartListItem();
    dispatch(loggedIn());
  }
}

export const loggedIn = accessToken => {
  if (localStorage.accessToken !== accessToken) {
    localStorage.setItem("accessToken", accessToken);
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

export const rate = data => {
  return {
    type: UserActionType.RATING,
    data
  };
};
export const rateError = error => {
  return {
    type: UserActionType.RATING_ERROR,
    error
  };
};

export const rating = data => {
  return dispatch => {
    return new Promise (res => {
      axios
      .post(`${API_URL}/feedbacks`, { feedback: data })
      .then(response => {
        return res(dispatch(rate(data)));
      })
      .catch(error => {
       return res(dispatch(rateError(error.message)));
      });
    })
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
/* update Profile */
export const updateUserProfileStart = () => {
  return {
    type: UserActionType.UPDATE_USER_PROFILE_START
  };
};
export const updateUserProfileError = () => {
  return {
    type: UserActionType.UPDATE_USER_PROFILE_ERROR
  };
};
export const updateUserProfileSuccess = () => {
  return {
    type: UserActionType.UPDATE_USER_PROFILE_SUCCESS,
  };
};
export const updateUserProfile = (id,data) => {
  return dispatch => {
    dispatch(updateUserProfileStart());
    axios
      .patch(`${API_URL}/users/${id}`, {user : data})
      .then(response => {
        dispatch(updateUserProfileSuccess());
      })
      .catch(error => {
        console.log("failed", error);
        dispatch(updateUserProfileError());
      });
  };
};