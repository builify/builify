import _assign from 'lodash/assign';
import * as Actions from '../actions/constants';

const builderConfigurationInitialState = {};

export default function builderConfiguration (state = builderConfigurationInitialState, action) {
  switch (action.type) {
    case Actions.RECEIVE_BUILDER_CONFIGURATION:
      return _assign({}, state, action.data);

    case Actions.RECEIVE_ASIDE_CONFIGURATION:
      return _assign({}, state, action.data);

    case Actions.GET_IMAGESLIBRARY: {
      const { data } = action;
      const { imageLibraryCategories } = data;

      return _assign({}, state, {
        imageLibraryCategories
      });
    }

    case Actions.GET_ICONPACKS: {
      return _assign({}, state, {
        iconPacks: action.iconPacks
      });
    }

    case Actions.GET_FONTS: {
      return _assign({}, state, {
        fontsList: action.data
      });
    }
  }

  return state;
}
