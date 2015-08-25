import {
  SET_DESIGN_COLOR
} from '../Constants/ActionTypes';

const initialState = {
  "design": {
    "colors": {
      "body": "#777",
      "anchor": "#333"
    }
  }
};
 
export function theme (state = initialState, action) {
  switch (action.type) {
    case SET_DESIGN_COLOR:
      console.log('setting color');
      return state;

    default:
      return state;
  }
}