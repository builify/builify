import _map from 'lodash/map';
import _assign from 'lodash/assign';
import _isElement from 'lodash/iselement';
import _isObject from 'lodash/isobject';
import TTDOM from '../common/TTDOM';
import * as Actions from '../actions/constants';

const canvasInitialState = {
  iFrameWindow: null,

  currentHoverBlock: {
    block: {},
    elementReference: null,
    topX: 10
  }
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

    case Actions.LOAD_PREVIOUS_PAGE:
    case Actions.LOAD_CONTENTBLOCK_TO_PAGE:
    case Actions.CLOSE_MODAL: {
      const { iFrameWindow } = state;
      const filesToUpdate = iFrameWindow.document.querySelectorAll('[data-update]');
      let script = null;

      _map(filesToUpdate, (file) => {
        const fileSource = file.getAttribute('src');

        TTDOM.element.remove(file);

        script = iFrameWindow.document.createElement('script');
        script.src = fileSource;
        script.async = true;
        script.setAttribute('data-update', true);

        iFrameWindow.document.head.appendChild(script);
      });

      return state;
    }

    case Actions.CURRENT_HOVER_BLOCK: {
      const { elementReference, block } = action;

      if (_isElement(elementReference) && _isObject(block)) {
        const { iFrameWindow } = state;
        const topX = TTDOM.misc.getAbsPosition(elementReference, iFrameWindow)[0] + 10;

        return _assign({}, state, {
          currentHoverBlock: {
            block: block,
            elementReference: elementReference,
            topX: topX
          }
        });
      } else {
        throw 'Missing element or object in hover object.';
      }
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
