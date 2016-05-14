import assign from 'lodash/assign';
import * as Actions from '../Actions/Constants';

const localizationInitialState = {};

export default function localization (state = localizationInitialState, action) {
  switch (action.type) {
    case Actions.GET_LOCALIZATION:
      return assign({}, state, action.data);

    default:
      return state;
  }
}
