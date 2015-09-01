import * as Actions from '../Constants/ActionTypes';

const modularScales = {
  minorSecond: {
    name: 'Minor second - 16/15'
  }
}

const initialState = {
  _colorPickerTarget: null,

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
    case Actions.OPEN_COLORPICKER:
      return Object.assign({}, state, {
        _colorPickerTarget: action.target
      });

    case Actions.SET_COLOR_FROM_COLORPICKER:
      const { color } = action;
      let dataColor = state._colorPickerTarget.getAttribute('data-color');

      if (dataColor) {
        if (state.design.colors.hasOwnProperty(dataColor)) {
          state.design.colors[dataColor] = '#' + color + '';
        }
      }

      return state; 

    case Actions.CLOSE_COLORPICKER:
      return Object.assign({}, state, {
        _colorPickerTarget: null
      });

    case Actions.SET_SWATCH:
      let selectedSwatch = state.currentSwatch;
      
      if (action.hasOwnProperty('swatch')) {
        selectedSwatch = String(action.swatch);
      }

      return Object.assign({}, state, {
        currentSwatch: selectedSwatch
      });
  }

  return state;
}