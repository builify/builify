import {
  SET_DESIGN_COLOR
} from '../Constants/ActionTypes';

const modularScales = {
  minorSecond: {
    name: 'Minor second - 16/15'
  }
}

const initialState = {
  design: {
    swatches: [
      {name: 'Emerald/Sun', colors: ['#2ecc71', '#f1c40f']},
      {name: 'Turq/Pomegra', colors: ['#1abc9c', '#c0392b']},
      {name: 'Peter River', colors: '#3498db'} 
    ],

    currentSwatch: 'Emerald/Sun',

    colors: {
      body: '#777',
      anchor: '#333',
      ahchorhover: '#333',
      anchorvisited: '#333',
      paragraph: '#444',
      header1: '#111',
      header2: '#222',
      header3: '#333',
      header4: '#444',
      blockquote: '#666'
    },

    typography: {
      fonts: {
        header: 'open+sans',
        body: 'roboto'
      },
      size: {
        basefont: 16,
        baseline: 24 
      }
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