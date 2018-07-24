import * as CategoryActionTypes from '../actiontypes/category';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isLoading: true,
  categories: {}
}

export default function Category(state = initialState, action){
  switch(action.type){
    case CategoryActionTypes.GET_CATEGORIES:
      if (typeof action.payload !== 'undefined') {
        const data =  typeof action.payload !== 'undefined' && 
                      typeof action.payload.data !== 'undefined'
                      ? action.payload.data : {};
        return {
          ...state,
          categories: data.categories || {},
          isLoading: isEmpty(data.categories)
        }
      } else{
        return {...state, isLoading: true};
      }
    default:
      return state;
  }
}
