import _map from 'lodash/map';
import _assign from 'lodash/assign';
import _isObject from 'lodash/isobject';
import TTDOM from '../common/TTDOM';
import * as Actions from '../actions/constants';

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

      return _assign({}, state, {
        iFrameWindow: iFrameWindow
      });
    }

    case Actions.TOGGLE_BASELINE: {
      return _assign({}, state, {
        drawBaseline: action.checked
      });
    }

    case Actions.LOAD_PREVIOUS_PAGE:
    case Actions.LOAD_CONTENTBLOCK_TO_PAGE:
    case Actions.CLOSE_MODAL: {
      const { iFrameWindow } = state;
      const filesToUpdate = iFrameWindow.document.querySelectorAll('[data-update]');
      let script = null;

      _map(filesToUpdate, (file) => {
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

      if (_isObject(block)) {
        const { iFrameWindow } = state;
        const { elementReference } = block;
        const topX = TTDOM.misc.getAbsPosition(elementReference, iFrameWindow)[0] + 10;

        return _assign({}, state, {
          currentHoverBlock: {
            block: block,
            topX: topX
          }
        });
      }

      return state;
    }

    case Actions.REMOVE_CONTENTBLOCK: {
      return _assign({}, state, {
        currentHoverBlock: {
          block: {}
        }
      });
    }
  }

  return state;
}
