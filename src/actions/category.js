import * as CategoryActionTypes from '../actiontypes/category';
import axios from 'axios';
const API_URL = 'http://localhost:6060/api/v1';

export const getCategories = () => {
  return (dispatch) => {
    dispatch({type: CategoryActionTypes.GET_CATEGORIES})
    axios.get(`${API_URL}/categories`)
      .then(response => {
        dispatch({type: CategoryActionTypes.GET_CATEGORIES, payload: response})
      })
      .catch(error => {
        dispatch({type: CategoryActionTypes.GET_CATEGORIES, payload: error});
      });    
  }
};