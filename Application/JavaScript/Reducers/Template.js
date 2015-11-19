import { setRules } from '../Common/StyleSheet';
import _ from 'lodash';
import * as Actions from '../Actions/Constants';

const initialState = {
  isColorPickerOpened: false,
  colorPickerSelectedElement: null,
  colorPickerSelectedElementColorElement: null,

  customStylesheetElement: null,

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

function template (state = initialState, action) {
  let { customStylesheetElement } = state;

  switch (action.type) {
    case Actions.GET_TEMPLATE_DATA:
      let data = {};

      if (_.has(action, 'data')) {
        data = action.data;
      }

      return _.assign({}, state, data);

    case Actions.OPEN_COLORPICKER:
      let element = null;
      let target = null;

      if(_.has(action, 'target')) {
        element = action.target;
        target = element.querySelector('.ab-color__colorHolder');
      }

      return _.assign({}, state, {
        isColorPickerOpened: true,
        colorPickerSelectedElement: element,
        colorPickerSelectedElementColorElement: target
      });

    case Actions.CLOSE_COLORPICKER:
      return _.assign({}, state, {
        isColorPickerOpened: false,
        colorPickerSelectedElement: null,
        colorPickerSelectedElementColorElement: null
      });

    case Actions.SET_COLOR_FROM_COLORPICKER:
      const { color } = action;
      let {
        design,
        colorPickerSelectedElementColorElement
      } = state;
      const dataColorTarget = colorPickerSelectedElementColorElement.
                                    getAttribute('data-colortarget');
      const dataColor = colorPickerSelectedElementColorElement.
                                    getAttribute('data-color');

      if (dataColorTarget) {
        if (design.colors[dataColorTarget]) {
          design.colors[dataColorTarget] = '#' + color + '';

          setRules(customStylesheetElement, dataColorTarget, {
            color: '#' + color
          });
        }
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

    case Actions.GET_THEME_CUSTOM_STYLESHEET_SHEET:
      if (_.has(action, 'sheet')) {
        customStylesheetElement = action.sheet;
      }

      return _.assign({}, state, {
        customStylesheetElement: customStylesheetElement
      });
  }

  return state;
}

export default template;
