import * as LocationActionType from '../actiontypes/location';
import axios from 'axios';
import {apiLinkDev as API_URL} from '../config/apiLink';

export const getLocation = () => {
  return dispatch => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition((position) => {
      dispatch({
        type: LocationActionType.GET_LOCATION,
        payload: position
      });
    });
  }
};