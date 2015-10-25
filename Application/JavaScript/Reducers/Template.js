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
    case Actions.GET_TEMPLATE_DATA:
      let data = {};

      if (_.has(action, 'data')) {
        data = action.data;
      }

      return _.assign({}, state, data);

    case Actions.OPEN_COLORPICKER:
      let target = null;

      if(_.has(action, 'target')) {
        target = action.target;
      }

      return _.assign({}, state, {
        _colorPickerTarget: target
      });

    case Actions.CLOSE_COLORPICKER:
      return _.assign({}, state, {
        _colorPickerTarget: null
      });

    case Actions.SET_COLOR_FROM_COLORPICKER:
      const { color } = action;
      let { design, _colorPickerTarget } = state;
      let dataColor = _colorPickerTarget.getAttribute('data-color');

      if (dataColor && _.has(state, 'design.colors.dataColor')) {
        design.colors[dataColor] = '#' + color + '';
      }

      return _.assign({}, state, {
        design: design
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
