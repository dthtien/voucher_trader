import * as LocationActionType from '../actiontypes/location';
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