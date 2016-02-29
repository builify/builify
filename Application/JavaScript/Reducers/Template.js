import TTStylesheet from 'ttstylesheet';
import _ from 'lodash';
import TTDOM from '../Common/TTDOM';
import TTBaseliner from '../TTBaseliner';
import * as Actions from '../Actions/Constants';

const initialState = {
  isColorPickerOpened: false,
  colorPickerSelectedElement: null,
  colorPickerSelectedElementColorElement: null,

  templateStylesheet: null,

  design: {
    swatches: [],
    currentSwatch: '',

    colors: {},

    typography: {
      size: {
        basefont: 16,
        baseline: 24
      }
    }
  },

  iFrameWindow: null,
  baseline: null,
  drawBaseline: false
};

function template (state = initialState, action) {
  switch (action.type) {
    case Actions.LOGIC_INITIALIZED: {
      const iFrame = TTDOM.iframe.get('ab-cfrm');
      const iFrameWindow = TTDOM.iframe.getWindow(iFrame);
      const headElement = iFrameWindow.document.head;
      const customStylesheet = new TTStylesheet(headElement);
      const baseline = new TTBaseliner({
        gridTarget: iFrameWindow.document
      });

      baseline.off();

      return _.assign({}, state, {
        iFrameWindow: iFrameWindow,
        baseline: baseline,
        templateStylesheet: customStylesheet
      });
    }

    case Actions.TOGGLE_BASELINE: {
      const { checked } = action;

      if (checked) {
        state.baseline.on();
      } else {
        state.baseline.off();
      }

      return _.assign({}, state, {
        drawBaseline: checked
      });
    }

    case Actions.GET_TEMPLATE_DATA: {
      if (_.has(action, 'data')) {
        return _.assign({}, state, action.data);
      }

      return state;
    }

    case Actions.OPEN_COLORPICKER: {
      let element = null;
      let target = null;

      if (_.has(action, 'target')) {
        element = action.target;
        target = element.querySelector('.ab-color__colorHolder');
      }

      return _.assign({}, state, {
        isColorPickerOpened: true,
        colorPickerSelectedElement: element,
        colorPickerSelectedElementColorElement: target
      });
    }

    case Actions.CLOSE_COLORPICKER: {
      return _.assign({}, state, {
        isColorPickerOpened: false,
        colorPickerSelectedElement: null,
        colorPickerSelectedElementColorElement: null
      });
    }

    case Actions.SET_COLOR_FROM_COLORPICKER: {
      const { color } = action;
      const { templateStylesheet } = state;
      let { design,colorPickerSelectedElementColorElement } = state;
      const dataColorTarget = colorPickerSelectedElementColorElement.
                                    getAttribute('data-colortarget');

      if (dataColorTarget) {
        if (design.colors[dataColorTarget] && templateStylesheet !== null) {
          const hexColor = `#${color}`;

          templateStylesheet.add({
            [dataColorTarget]: {
              color: hexColor
            }
          });

          templateStylesheet.initCSS();

          design.colors[dataColorTarget] = hexColor;
        }
      }

      return _.assign({}, state, {
        design: design
      });
    }

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

export default template;
