import _ from 'lodash';
import TTStylesheet from 'ttstylesheet';
import TTDOM from '../Common/TTDOM';
import TTBaseliner from '../TTBaseliner';
import * as Actions from '../Actions/Constants';

const initialState = {
  // Colorpicker
  isColorPickerOpened: false,
  colorPickerSelectedElement: null,
  colorPickerSelectedElementColorElement: null,

  // Template stylesheet
  templateStylesheet: null,

  // Baseline related
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
      const baselineValue = state.design.typography.size.baseline;
      const baseFontsize = state.design.typography.size.basefont;
      const baselineToPxValue = baseFontsize * baselineValue;

      const customStylesheet = new TTStylesheet(headElement);
      const baseline = new TTBaseliner({
        gridTarget: iFrameWindow.document,
        gridHeight: baselineToPxValue
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
      const baselineValue = state.design.typography.size.baseline;
      const baseFontsize = state.design.typography.size.basefont;
      const baselineToPxValue = baseFontsize * baselineValue;

      if (checked) {
        state.baseline.setHeight(baselineToPxValue);
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
      let element = action.target;
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
      let { design, colorPickerSelectedElementColorElement } = state;
      const dataColorTarget = colorPickerSelectedElementColorElement.
                                    getAttribute('data-colortarget');

      if (dataColorTarget) {
        if (design.colors &&
          design.colors[dataColorTarget] &&
          templateStylesheet !== null) {
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

    case Actions.CHANGE_BASELINE_VALUE: {
      const { value } = action;
      const { design, templateStylesheet } = state;

      if (value) {
        templateStylesheet.add({
          body: {
            lineHeight: value
          }
        });

        design.typography.size.baseline = value;

        templateStylesheet.initCSS();

        return _.assign({}, state, {
          design: design
        });
      }

      return state;
    }

    case Actions.CHANGE_BASE_FONT_SIZE: {
      const { value } = action;
      const { design, templateStylesheet } = state;

      if (value) {
        templateStylesheet.add({
          html: {
            fontSize: value
          }
        });

        design.typography.size.basefont = value;

        templateStylesheet.initCSS();

        return _.assign({}, state, {
          design: design
        });
      }

      return state;
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
