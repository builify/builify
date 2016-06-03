import Actions from './constants';

export function uploadFile (file) {
  return {
    type: Actions.UPLOAD_FILE,
    file: file
  };
}
