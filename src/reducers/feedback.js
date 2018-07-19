import * as FeedbackActionTypes from '../actiontypes/feedback';

const initialState = {
  isLoading: true,
  all: {}
}

export default function Category(state = initialState, action){
  switch(action.type){
    case FeedbackActionTypes.GET_FEEDBACKS:
      if (typeof action.payload !== 'undefined') {
        const data =  typeof action.payload !== 'undefined' && 
                      typeof action.payload.data !== 'undefined'
                      ? action.payload.data : {};
        return {
          ...state,
          all: data.feedbacks || {},
          isLoading: false
        }
      } else{
        return {...state, isLoading: true};
      }
    default:
      return state;
  }
}
