import * as Actions from '../Constants/Actions';

const modularScales = {
  minorSecond: {
    name: 'Minor second - 16/15'
  }
}

const initialState = {
  _colorPickerTarget: null,

  _canvas: {
    navigationBlock: {},
    mainBlocks: [],
    footerBlock: {}
  },

  design: {
    swatches: [],
    currentSwatch: '',

    colors: {},

    typography: {
      fonts: {
        header: '',
        body: ''
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
    case Actions.GET_SELECTED_TEMPLATE_DATA:
      let data = {};

      if (action.hasOwnProperty('data')) {
        data = action.data;
      }

      return Object.assign({}, state, data);

    case Actions.LOAD_CONTENTBLOCK_SOURCE_TO_CANVAS:
      if (action.hasOwnProperty('HTMLData')) {
        const { HTMLData } = action;

        state._canvas.mainBlocks.push({
          'type': 'block-banner',
          'src': HTMLData
        });
      }
      return Object.assign({}, state, {});

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