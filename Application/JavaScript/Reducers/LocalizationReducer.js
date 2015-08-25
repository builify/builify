import {
  GET_LOCALIZATION
} from '../Constants/ActionTypes';

const localizationInitialState = {};

export function localization (state = localizationInitialState, action) {
  switch (action.type) {
    case GET_LOCALIZATION:
      const { data } = action;

      return data;
  }

  return state;
}