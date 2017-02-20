import { assign as _assign } from 'lodash';
import * as Actions from '../actions/constants';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.RECEIVE_BUILDER_CONFIGURATION:
      return _assign({}, state, action.data);

    case Actions.RECEIVE_ASIDE_CONFIGURATION:
      return _assign({}, state, action.data);

    case Actions.GET_IMAGESLIBRARY: {
      const { data } = action;
      const { categories } = data;

      return _assign({}, state, {
        imageLibraryCategories: categories
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

    default:
      return state;
  }
}
