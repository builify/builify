import Actions from './Constants';

export function openPreview () {
  return {
    type: Actions.OPEN_PREVIEW
  };
}

export function closePreview () {
  return {
    type: Actions.CLOSE_PREVIEW
  };
}

export function setPreviewMode (mode) {
  return {
    type: Actions.SET_PREVIEW_MODE,
    mode: mode
  };
}

export function rotatePreviewView () {
  return {
    type: Actions.PREVIEW_MODE_ROTATE
  };
}
