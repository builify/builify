import _assign from 'lodash/assign';
import _isUndefined from 'lodash/isundefined';
import _isArray from 'lodash/isarray';
import _findIndex from 'lodash/findindex';
import _map from 'lodash/map';
import storage from '../modules/tt-storage';
import * as Actions from '../actions/constants';
import { TEMPLATE_ASSETS_STORAGE_NAME } from '../constants';

const initialState = [];

export default function assets (state = initialState, action) {
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
  }

  return state;
}
