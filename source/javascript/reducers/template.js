import _ from 'lodash';
import TTStylesheet from 'ttstylesheet';
import TTDOM from '../common/TTDOM';
import TTBaseliner from '../modules/tt-baseliner';
import * as Actions from '../actions/constants';
import * as Constants from '../constants';

const initialState = {
  // Colorpicker
  isColorPickerOpened: false, // Is colorpicker opened or not?
  selectedCPElement: null, // Element whose position will be used for colorpicker position.
  sourceCPElement: null, // Where the click orginates from. For section toolbox.

  // Template stylesheet
  templateStylesheet: null,

  // Baseline related
  iFrameWindow: null,
  baseline: null,
  drawBaseline: false
};

export default function template (state = initialState, action) {
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
      return _.assign({}, state, {
        isColorPickerOpened: true,
        selectedCPElement: action.target,
        sourceCPElement: action.sourceElement
      });
    }

    case Actions.CLOSE_COLORPICKER: {
      return _.assign({}, state, {
        isColorPickerOpened: false,
        selectedCPElement: null,
        sourceCPElement: null
      });
    }

    case Actions.SET_COLOR_FROM_COLORPICKER: {
      const { color, targetType } = action;
      const { selectedCPElement } = state;

      if (!selectedCPElement) {
        return state;
      }

      if (targetType === Constants.ColorPickerTargetTypes.COLOR) {
        var { templateStylesheet, design } = state;
        const { hex } = color;
        const dataColorTarget = selectedCPElement.getAttribute('data-colortarget');

        if (dataColorTarget && design.colors[dataColorTarget]) {
          const colorCircleElement = selectedCPElement.querySelector('.ab-color__circle');
          const hexColor = `#${hex}`;

          design.colors[dataColorTarget] = hexColor;
          colorCircleElement.style.backgroundColor = hexColor;

          templateStylesheet.add({
            [dataColorTarget]: {
              color: hexColor
            }
          });

          templateStylesheet.initCSS();

          return _.assign({}, state, {
            design: design
          });
        }
      } else if (targetType === Constants.ColorPickerTargetTypes.BACKGROUNDCOLOR) {
        const coverColorElement = selectedCPElement.querySelector('.block-background-cover-color');
        const { hex, rgb } = color;

        coverColorElement.style.backgroundColor = hex;
        coverColorElement.style.opacity = rgb.a;
      }

      return state;
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
