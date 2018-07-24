import * as FeedbackActionTypes from '../actiontypes/feedback';
import axios from 'axios';
import {apiLinkDev as API_URL} from '../config/apiLink';

export const getFeedbacks = (type, id) => {
  return (dispatch) => {
    dispatch({type: FeedbackActionTypes.GET_FEEDBACKS})
    axios.get(`${API_URL}/${type}/${id}/feedbacks`)
      .then(response => {
        dispatch({type: FeedbackActionTypes.GET_FEEDBACKS, payload: response})
      })
      .catch(error => {
        dispatch({type: FeedbackActionTypes.GET_FEEDBACKS, payload: error});
      });    
  }
};