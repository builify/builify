import _ from 'lodash';
import * as Actions from '../Actions/Constants';

const initialState = {
  previewMode: 0,
  landscapeView: false
};

function preview (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_PREVIEW_MODE:
      return _.assign({}, state, {
        previewMode: action.mode
      });

    case Actions.PREVIEW_MODE_ROTATE:
      return _.assign({}, state, {
        landscapeView: !state.landscapeView
      });

    default:
      return state;
  }
}

export default preview;
