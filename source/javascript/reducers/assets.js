import {
  assign as _assign,
  findIndex as _findIndex,
  map as _map,
  isArray as _isArray,
  isUndefined as _isUndefined
} from 'lodash';
import storage from '../modules/tt-storage';
import * as Actions from '../actions/constants';
import { TEMPLATE_ASSETS_STORAGE_NAME } from '../constants';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.INITIALIZE: {
      const assetsInStorage = storage.get(TEMPLATE_ASSETS_STORAGE_NAME);

      if (!_isUndefined(assetsInStorage) && _isArray(assetsInStorage)) {
        return [
          ...state,
          ...assetsInStorage
        ];
      }

      return state;
    }

    case Actions.UPLOAD_FILE: {
      const file = _assign({}, action.file, {
        isInUse: false
      });

      storage.set(TEMPLATE_ASSETS_STORAGE_NAME, [...state, file]);

      return [
        ...state,
        file
      ];
    }

    case Actions.SELECT_IMAGE_FILE: {
      const { file } = action;
      const query = { fileName: file.fileName, fileSize: file.fileSize };
      const index = _findIndex(state, query);

      if (index !== -1) {
        return _map(state, (item, i) => {
          if (i === index) {
            return _assign({}, item, {
              isInUse: true
            });
          }

          return item;
        });
      }

      return state;
    }

    case Actions.DELETE_ALL_ASSETS: {
      storage.deleteKey(TEMPLATE_ASSETS_STORAGE_NAME);

      return [];
    }

    default:
      return state;
  }
}
