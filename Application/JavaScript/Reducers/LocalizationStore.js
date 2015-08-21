import {
  GET_LOCALIZATION
} from '../Constants/ActionTypes';

export default function localization (state = {}, action) {
  switch (action.type) {
    case GET_LOCALIZATION:
      return action.data;
 
    default:
      return state;
  }
};