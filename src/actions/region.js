import * as RegionActionTypes from '../actiontypes/region';
import axios from 'axios';
const API_URL = 'http://localhost:6060/api/v1';

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