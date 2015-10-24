import * as Actions from '../Constants/Actions';
import { randomKey } from '../Common/Common';
import _ from 'lodash';

const initialState = {
  _colorPickerTarget: null,

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

function theme (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_SELECTED_TEMPLATE_DATA:
      let data = {};

      if (_.has(action, 'data')) {
        data = action.data;
      }

      return _.assign({}, state, data);

    case Actions.OPEN_COLORPICKER:
      return _.assign({}, state, {
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
      return _.assign({}, state, {
        _colorPickerTarget: null
      });

    case Actions.SET_SWATCH:
      let designState = state.design;

      if (_.has(action, 'swatch')) {
        designState.currentSwatch = action.swatch;
      }

      return _.assign({}, state, {
        design: designState
      });
  }

  return state;
}

export default theme;
