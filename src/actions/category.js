import * as CategoryActionTypes from '../actiontypes/category';
import axios from 'axios';
import {apiLinkDev as API_URL} from '../config/apiLink';

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