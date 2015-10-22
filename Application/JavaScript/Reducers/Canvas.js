import { getAbsPosition } from '../Common/Common';
import * as Actions from '../Constants/Actions';

const canvasInitialState = {
  currentHoverBlock: {
    element: null,
    topX: 10
  }
};

export function canvas (state = canvasInitialState, action) {
  switch (action.type) {
    case Actions.CURRENT_HOVER_BLOCK:
      let { currentHoverBlock } = state;
      const { element } = action;
      const { elementReference } = element;

      currentHoverBlock.element = elementReference;
      currentHoverBlock.topX = getAbsPosition(elementReference)[0] + 10;

      return Object.assign({}, state, {
        currentHoverBlock: currentHoverBlock
      });
  }

  return state;
}
