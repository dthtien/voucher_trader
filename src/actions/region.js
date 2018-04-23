import * as RegionActionTypes from '../actiontypes/region';
import axios from 'axios';
import {apiLinkDev as API_URL} from '../config/apiLink';

export const getRegions = () => {
  return (dispatch) => {
    dispatch({type: RegionActionTypes.GET_REGIONS})
    axios.get(`${API_URL}/categories`)
      .then(response => {
        dispatch({type: RegionActionTypes.GET_REGIONS, payload: response})
      })
      .catch(error => {
        dispatch({type: RegionActionTypes.GET_REGIONS, payload: error});
      });    
  }
};