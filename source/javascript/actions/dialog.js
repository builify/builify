import Actions from './constants';
import { addNotification } from './notifications';
import { IS_DEMO_VERSION } from '../constants';

export function openIconEditModal (target) {
  return {
    type: Actions.OPEN_ICON_EDIT_MODAL,
    target
  };
}

export function openImageEditModal (target) {
  return {
    type: Actions.OPEN_IMAGE_EDIT_MODAL,
    target
  };
}

export function openVideoEditModal (target) {
  return {
    type: Actions.OPEN_VIDEO_EDIT_MODAL,
    target
  };
}

export function openCountdownEditModal (target) {
  return {
    type: Actions.OPEN_COUNTDOWN_EDIT_MODAL,
    target
  };
}

export function openPreviousPagesSelectionModal () {
  return {
    type: Actions.OPEN_PREVIOUS_PAGES_SELECT_MODAL
  };
}

export function openDownloadModal () {
  return function (dispatch, getState) {
    if (IS_DEMO_VERSION) {
      dispatch(addNotification({
        level: 'warning',
        title: 'Demo Version',
        message: 'Buy full version to get access'
      }));
    } else {
      dispatch({
        type: Actions.OPEN_DOWNLOAD_MODAL,
        currentState: getState()
      });
    }
  };
}

export function openRestartModal () {
  return {
    type: Actions.OPEN_RESTART_MODAL
  };
}

export function openFeedbackModal () {
  return {
    type: Actions.OPEN_FEEDBACK_MODAL
  };
}

export function openMapsModal () {
  return {
    type: Actions.OPEN_MAPS_MODAL
  };
}

export function openCustomCSSModal () {
  return {
    type: Actions.OPEN_CUSTOMCSS_MODAL
  };
}

export function openLinkChangeModal () {
  return {
    type: Actions.OPEN_LINK_CHANGE_MODAL
  };
}

export function closeModal () {
  return {
    type: Actions.CLOSE_MODAL
  };
}
