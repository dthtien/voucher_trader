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
        return {
          ...state,
          categories: action.payload.data.categories,
          isLoading: isEmpty(action.payload.data.categories)
        }
      } else{
        return {...state, isLoading: true};
      }
    default:
      return state;
  }
}
