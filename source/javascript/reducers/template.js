import TTStylesheet from 'tt-stylesheet';
import TTDOM from '../common/TTDOM';
import TTBaseliner from '../modules/tt-baseliner';
import * as Actions from '../actions/constants';
import * as Constants from '../constants';
import {
  assign as _assign,
  has as _has,
  round as _round,
  isNull as _isNull,
  isElement as _isElement
} from 'lodash';

const initialState = {
  // Colorpicker
  isColorPickerOpened: false, // Is colorpicker opened or not?
  selectedCPElement: null,    // Element whose position will be used for colorpicker position.
  sourceCPElement: null,      // Where the click orginates from. For section toolbox.

  // Template stylesheet
  templateStylesheet: null,

  // Custom stylesheet,
  userCustomStylesheet: null,
  customStylesheetText: '.my-custom-css { font-size: 14px; }',

  // Baseline related
  iFrameWindow: null,
  baseline: null,
  drawBaseline: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.LOGIC_INITIALIZED: {
      const iFrame = TTDOM.iframe.get('ab-cfrm');
      const iFrameWindow = TTDOM.iframe.getWindow(iFrame);
      const headElement = iFrameWindow.document.head;
      const baselineValue = state.design.typography.size.baseline;
      const baseFontsize = state.design.typography.size.basefont;
      const baselineToPxValue = _round(baseFontsize * baselineValue, 2);

      // Create stylings stylesheet.
      const customStylesheet = new TTStylesheet(headElement);

      // Create baseline guide.
      const baseline = new TTBaseliner({
        gridTarget: iFrameWindow.document,
        gridHeight: baselineToPxValue
      });

      baseline.off();

      // Create custom stylesheet for user.
      const userCustomStylesheet = document.createElement('style');

      userCustomStylesheet.type = 'text/css';
      userCustomStylesheet.setAttribute('data-customcss', true);

      if (userCustomStylesheet.styleSheet) {
        userCustomStylesheet.styleSheet.cssText = state.customStylesheetText;
      } else {
        userCustomStylesheet.appendChild(document.createTextNode(state.customStylesheetText));
      }

      headElement.appendChild(userCustomStylesheet);

      return _assign({}, state, {
        iFrameWindow: iFrameWindow,
        baseline: baseline,
        templateStylesheet: customStylesheet,
        userCustomStylesheet: userCustomStylesheet
      });
    }

    case Actions.SET_CUSTOM_CSS: {
      const { value } = action;
      const { userCustomStylesheet } = state;

      if (!_isNull(userCustomStylesheet)) {
        if (userCustomStylesheet.styleSheet) {
          userCustomStylesheet.styleSheet.cssText = value;
        } else {
          userCustomStylesheet.appendChild(document.createTextNode(value));
        }
      }

      return _assign({}, state, {
        customStylesheetText: value
      });
    }

    case Actions.START_NEW_PAGE:
    case Actions.RESTART_PAGE:
    case Actions.LOAD_PREVIOUS_PAGE:
      state.baseline.off();
      
      return _assign({}, state, {
        drawBaseline: false
      });

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

      return _assign({}, state, {
        drawBaseline: checked
      });
    }

    case Actions.GET_TEMPLATE_DATA: {
      if (_has(action, 'data')) {
        if (_has(action.data, 'name')) {
          console.log(`BUILify - Obtained ${action.data.name} template data successfully.`);
        }

        return _assign({}, state, action.data);
      }

      return state;
    }

    case Actions.OPEN_COLORPICKER: {
      return _assign({}, state, {
        isColorPickerOpened: true,
        selectedCPElement: action.target,
        sourceCPElement: action.sourceElement
      });
    }

    case Actions.CLOSE_COLORPICKER: {
      return _assign({}, state, {
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

          design.colors[dataColorTarget] = hex;
          colorCircleElement.style.backgroundColor = hex;
          colorCircleElement.setAttribute('data-color', hex);

          templateStylesheet.add({
            [dataColorTarget]: {
              color: hex
            }
          });

          templateStylesheet.initCSS();

          return _assign({}, state, {
            design: design
          });
        }
      } else if (targetType === Constants.ColorPickerTargetTypes.BACKGROUNDCOLOR) {
        const coverColorElement = selectedCPElement.querySelector(Constants.BLOCK_BACKGROUND_COLOR_ELEMENT_CLASSNAME);

        if (_isElement(coverColorElement)) {
          const { hex, rgb } = color;
          coverColorElement.style.backgroundColor = hex;
          coverColorElement.style.opacity = rgb.a;
        }
      }

      return state;
    }

    case Actions.CHANGE_BASELINE_VALUE: {
      const { value } = action;
      const { design, templateStylesheet, drawBaseline, baseline } = state;

      if (value) {
        templateStylesheet.add({
          body: {
            lineHeight: value
          }
        });

        design.typography.size.baseline = value;

        templateStylesheet.initCSS();

        if (drawBaseline === true) {
          const baselineValue = value;
          const baseFontsize = state.design.typography.size.basefont;
          const baselineToPxValue = baseFontsize * baselineValue;

          baseline.setHeight(baselineToPxValue);
        }

        return _assign({}, state, {
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

        return _assign({}, state, {
          design: design
        });
      }

      return state;
    }

    case Actions.SET_SWATCH: {
      let designState = state.design;

      if (_has(action, 'swatch')) {
        designState.currentSwatch = action.swatch;
      }

      return _assign({}, state, {
        design: designState
      });
    }
  }

  return state;
}
