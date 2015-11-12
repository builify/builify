import { getAbsPosition } from '../Common/Common';
import _ from 'lodash';
import * as Actions from '../Constants/Actions';

const canvasInitialState = {
  currentHoverBlock: {
    element: null,
    topX: 10
  },

  isContentBlockSettingsMenuOpened: false
};

function canvas (state = canvasInitialState, action) {
  switch (action.type) {
    case Actions.CURRENT_HOVER_BLOCK:
      let { currentHoverBlock } = state;
      const { element } = action;
      const { elementReference } = element;

      currentHoverBlock.element = elementReference;
      currentHoverBlock.topX = getAbsPosition(elementReference)[0] + 10;

      return _.assign({}, state, {
        currentHoverBlock: currentHoverBlock
      });

    case Actions.OPEN_CONTENTBLOCK_SETTINGS:
      const { isContentBlockSettingsMenuOpened } = state;

      return _.assign({}, state, {
        isContentBlockSettingsMenuOpened: !isContentBlockSettingsMenuOpened
      });
  }

  return state;
}

export default canvas;
