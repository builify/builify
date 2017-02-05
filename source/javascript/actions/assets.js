import Actions from './constants';
import { addNotification } from './notifications';
import { closeModal } from './modal';
import { getExtension } from '../common/misc';
import {
  isUndefined as _isUndefined
} from 'lodash';

export function uploadFile (file) {
  return function (dispatch) {
    const extension = getExtension(file.fileName);

    if (!_isUndefined(extension)) {
      switch (extension.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          dispatch({
            type: Actions.UPLOAD_FILE,
            file: file
          });

          break;

        default:
          dispatch(closeModal());
          dispatch(addNotification({
            message: 'File type is not supported.',
            level: 'info'
          }));

          break;
      }
    }
  };
}

export function selectImageFile (file) {
  return {
    type: Actions.SELECT_IMAGE_FILE,
    file
  };
}

export function deleteAllAssets () {
  return {
    type: Actions.DELETE_ALL_ASSETS
  };
}
