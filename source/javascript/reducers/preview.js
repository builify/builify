import * as Actions from '../actions/constants';
import { PreviewModes } from '../constants';
import {
  assign as _assign
} from 'lodash';

const initialState = {
  previewMode: PreviewModes.INITIAL
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_PREVIEW_MODE:
      return _assign({}, state, {
        previewMode: action.mode
      });

    default:
      return state;
  }
}
