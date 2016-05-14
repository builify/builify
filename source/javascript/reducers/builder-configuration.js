import assign from 'lodash/assign';
import * as Actions from '../Actions/Constants';
import { setLanguage } from '../Common/Localization';

const builderConfigurationInitialState = {};

export default function builderConfiguration (state = builderConfigurationInitialState, action) {
  switch (action.type) {
    case Actions.RECEIVE_BUILDER_CONFIGURATION:
      return assign({}, state, action.data);

    case Actions.RECEIVE_ASIDE_CONFIGURATION:
      return assign({}, state, action.data);

    case Actions.PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION:
      const { localization } = state;

      setLanguage(localization || 'en');

      return state;

    case Actions.GET_IMAGESLIBRARY: {
      const { data } = action;
      const { imageLibraryCategories } = data;

      return assign({}, state, {
        imageLibraryCategories
      });
    }

    case Actions.GET_ICONPACKS: {
      const { iconPacks } = action;

      return assign({}, state, {
        iconPacks: iconPacks
      });
    }

    case Actions.GET_FONTS: {
      const { data } = action;

      return assign({}, state, {
        fontsList: data
      });
    }
  }

  return state;
}
