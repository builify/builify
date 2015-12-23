import _ from 'lodash';
import TPStylesheet from '../TPStylesheet';
import DOM from '../Common/DOM';
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
  switch (action.type) {
    case Actions.LOGIC_INITIALIZED: {
      const iFrame = DOM.iframe.get('ab-cfrm');
      const iFrameWindow = DOM.iframe.getWindow(iFrame);
      const headElement = iFrameWindow.document.head;

      return _.assign({}, state, {
        templateStylesheet: new TPStylesheet(headElement)
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

      if(_.has(action, 'target')) {
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
      const dataColor = colorPickerSelectedElementColorElement.
                                    getAttribute('data-color');

      if (dataColorTarget) {
        if (design.colors[dataColorTarget] && templateStylesheet !== null) {
          const hexColor = `#${color}`;
          design.colors[dataColorTarget] = hexColor;

          templateStylesheet.add(dataColorTarget, {
            color: hexColor
          }, true);
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
