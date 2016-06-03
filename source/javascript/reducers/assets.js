import _assign from 'lodash/assign';
import * as Actions from '../actions/constants';

const initialState = [];

export default function assets (state = initialState, action) {
  switch (action.type) {
    case Actions.UPLOAD_FILE: {
      const file = _assign({}, action.file, {
        isInUse: false
      });

      return [
        ...state,
        file
      ];
    }
  }

  return state;
}
