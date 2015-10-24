import * as Actions from '../Constants/Actions';

const localizationInitialState = {};

function localization(state = localizationInitialState, action) {
  switch (action.type) {
    case Actions.GET_LOCALIZATION:
      return Object.assign({}, state, action.data);

    default:
      return state;
  }
}

export default localization;
