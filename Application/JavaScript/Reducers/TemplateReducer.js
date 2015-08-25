import {
  SET_DESIGN_COLOR
} from '../Constants/ActionTypes';

const initialState = {
  design: {
    swatches: [
      {name: 'Emerald/Sun', colors: ['#2ecc71', '#f1c40f']},
      {name: 'Turq/Pomegra', colors: ['#1abc9c', '#c0392b']},
      {name: 'Peter River', colors: '#3498db'} 
    ],

    colors: {
      body: "#777",
      anchor: "#333"
    }
  }
};
 
export function theme (state = initialState, action) {
  switch (action.type) {
    case SET_DESIGN_COLOR:
      return state;

    default:
      return state;
  }
}