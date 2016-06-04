import Actions from './constants';

export function uploadFile (file) {
  return {
    type: Actions.UPLOAD_FILE,
    file: file
  };
}

export function selectImageFile (file) {
  return {
    type: Actions.SELECT_IMAGE_FILE,
    file: file
  };
}
