import * as Actions from '../Constants/Actions';

const localizationInitialState = {};

export function localization (state = localizationInitialState, action) {
  switch (action.type) {
    case Actions.GET_LOCALIZATION:
      return Object.assign({}, state, action.data);
  }

  return state;
}