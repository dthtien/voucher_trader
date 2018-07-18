import * as LocationActionType from '../actiontypes/location';
const initialState = {
  isLoadingLocation: true,
  location: {}
}

export default function Category(state = initialState, action){
  switch(action.type){
    case LocationActionType.GET_LOCATION:
      if (typeof action.payload !== 'undefined') {
        const data =  typeof action.payload !== 'undefined' && 
                      typeof action.payload.coords !== 'undefined'
                      ? action.payload.coords : {};
        return {
          ...state,
          location: data || {},
          isLoadingLocation: false
        }
      } else{
        return {...state, isLoadingLocation: true};
      }
    default:
      return state;
  }
}
