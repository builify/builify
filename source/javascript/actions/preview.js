import Actions from './constants';

export function setPreviewMode (mode) {
  return {
    type: Actions.SET_PREVIEW_MODE,
    mode: mode
  };
}
