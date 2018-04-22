import * as RegionActionTypes from '../actiontypes/region';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isLoading: true,
  regions: {}
}

export default function Category(state = initialState, action){
  switch(action.type){
    case RegionActionTypes.GET_REGIONS:
      if (typeof action.payload !== 'undefined') {
        return {
          ...state,
          regions: action.payload.data.regions,
          isLoading: isEmpty(action.payload.data.regions)
        }
      } else{
        return {...state, isLoading: true};
      }
    default:
      return state;
  }
}
