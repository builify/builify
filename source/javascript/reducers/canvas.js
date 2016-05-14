import TTDOM from '../Common/TTDOM';
import map from 'lodash/map';
import assign from 'lodash/assign';
import isObject from 'lodash/isobject';
import * as Actions from '../Actions/Constants';

const canvasInitialState = {
  iFrameWindow: null,

  currentHoverBlock: {
    block: {},
    topX: 10
  },

  drawBaseline: false
};

export default function canvas (state = canvasInitialState, action) {
  switch (action.type) {
    case Actions.LOGIC_INITIALIZED: {
      const iFrame = TTDOM.iframe.get('ab-cfrm');
      const iFrameWindow = TTDOM.iframe.getWindow(iFrame);

      return assign({}, state, {
        iFrameWindow: iFrameWindow
      });
    }

    case Actions.TOGGLE_BASELINE: {
      const { checked } = action;

      return assign({}, state, {
        drawBaseline: checked
      });
    }

    case Actions.LOAD_PREVIOUS_PAGE:
    case Actions.LOAD_CONTENTBLOCK_TO_PAGE:
    case Actions.CLOSE_MODAL: {
      const { iFrameWindow } = state;
      const filesToUpdate = iFrameWindow.document.querySelectorAll('[data-update]');
      let script = null;

      map(filesToUpdate, (file) => {
        const fileSource = file.getAttribute('src');

        file.remove();

        script = iFrameWindow.document.createElement('script');
        script.src = fileSource;
        script.async = true;
        script.setAttribute('data-update', true);

        iFrameWindow.document.head.appendChild(script);
      });

      return state;
    }

    case Actions.CURRENT_HOVER_BLOCK: {
      const { block } = action;

      if (isObject(block)) {
        const { iFrameWindow } = state;
        const { elementReference } = block;
        const topX = TTDOM.misc.getAbsPosition(elementReference, iFrameWindow)[0] + 10;

        return assign({}, state, {
          currentHoverBlock: {
            block: block,
            topX: topX
          }
        });
      }

      return state;
    }

    case Actions.REMOVE_CONTENTBLOCK: {
      return assign({}, state, {
        currentHoverBlock: {
          block: {}
        }
      });
    }
  }

  return state;
}
