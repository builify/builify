import { getAbsPosition } from '../Common/Common';
import _ from 'lodash';
import * as Actions from '../Actions/Constants';

const canvasInitialState = {
  currentHoverBlock: {
    block: {},
    topX: 10
  }
};

function canvas (state = canvasInitialState, action) {
  switch (action.type) {
    case Actions.CURRENT_HOVER_BLOCK: {
      const { block } = action;

      if (_.isObject(block)) {
        const { elementReference } = block;
        const topX = getAbsPosition(elementReference)[0] + 10;

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
