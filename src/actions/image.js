import axios from 'axios';
import {apiLinkDev as API_URL} from '../config/apiLink';

export const createImage = (data) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append("image", data);
    return axios.post(`${API_URL}/images`, formData);
  }
};

export const deleteImage = (id) =>{
  return (dispatch) => {
    return axios.delete(`${API_URL}/images/${id}`);
  }
}