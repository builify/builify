import TTDOM from '../Common/TTDOM';
import _ from 'lodash';
import * as Actions from '../Actions/Constants';

const canvasInitialState = {
  iFrameWindow: null,

  currentHoverBlock: {
    block: {},
    topX: 10
  },

  drawBaseline: false
};

function canvas (state = canvasInitialState, action) {
  switch (action.type) {
    case Actions.LOGIC_INITIALIZED: {
      const iFrame = TTDOM.iframe.get('ab-cfrm');
      const iFrameWindow = TTDOM.iframe.getWindow(iFrame);

      return _.assign({}, state, {
        iFrameWindow: iFrameWindow
      });
    }

    case Actions.TOGGLE_BASELINE: {
      const { checked } = action;

      return _.assign({}, state, {
        drawBaseline: checked
      });
    }

    case Actions.LOAD_PREVIOUS_PAGE:
    case Actions.LOAD_CONTENTBLOCK_TO_PAGE:
    case Actions.CLOSE_MODAL: {
      const { iFrameWindow } = state;
      const filesToUpdate = iFrameWindow.document.querySelectorAll('[data-update]');
      let script = null;

      _.map(filesToUpdate, (file) => {
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

      if (_.isObject(block)) {
        const { iFrameWindow } = state;
        const { elementReference } = block;
        const topX = TTDOM.misc.getAbsPosition(elementReference, iFrameWindow)[0] + 10;

        return _.assign({}, state, {
          currentHoverBlock: {
            block: block,
            topX: topX
          }
        });
      }

      return state;
    }

    case Actions.REMOVE_CONTENTBLOCK: {
      return _.assign({}, state, {
        currentHoverBlock: {
          block: {}
        }
      });
    }
  }

  return state;
}

export default canvas;
