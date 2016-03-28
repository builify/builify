import Actions from './Constants';

export function openLinkEditModal (target) {
  return {
    type: Actions.OPEN_LINK_EDIT_MODAL,
    target: target
  };
}

export function openIconEditModal (target) {
  return {
    type: Actions.OPEN_ICON_EDIT_MODAL,
    target: target
  };
}

export function openImageEditModal (target) {
  return {
    type: Actions.OPEN_IMAGE_EDIT_MODAL,
    target: target
  };
}

export function openPreviousPagesSelectionModal () {
  return {
    type: Actions.OPEN_PREVIOUS_PAGES_SELECT_MODAL
  };
}

export function openDownloadModal () {
  return (dispatch, getState) => {
    dispatch({
      type: Actions.OPEN_DOWNLOAD_MODAL,
      currentState: getState()
    });
  };
}

export function openRestartModal () {
  return {
    type: Actions.OPEN_RESTART_MODAL
  };
}

export function closeModal () {
  return {
    type: Actions.CLOSE_MODAL
  };
}
