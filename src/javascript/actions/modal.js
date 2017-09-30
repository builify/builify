import Actions from './constants';
import { IS_DEMO_VERSION } from '../constants';
import { demoNotification } from './notifications';

export function openIconEditModal(target = null) {
    return {
        type: Actions.OPEN_ICON_EDIT_MODAL,
        target
    };
}

export function openImageEditModal(target = null) {
    return {
        type: Actions.OPEN_IMAGE_EDIT_MODAL,
        target
    };
}

export function openVideoEditModal(target = null) {
    return {
        type: Actions.OPEN_VIDEO_EDIT_MODAL,
        target
    };
}

export function openCountdownEditModal(target = null) {
    return {
        type: Actions.OPEN_COUNTDOWN_EDIT_MODAL,
        target
    };
}

export function openPreviousPagesSelectionModal() {
    return {
        type: Actions.OPEN_PREVIOUS_PAGES_SELECT_MODAL
    };
}

export function openDownloadModal(isDemoVersion = IS_DEMO_VERSION) {
    return (dispatch, getState) => {
        if (isDemoVersion) {
            dispatch(demoNotification());
        } else {
            dispatch({
                type: Actions.OPEN_DOWNLOAD_MODAL,
                currentState: getState()
            });
        }
    };
}

export function openRestartModal() {
    return {
        type: Actions.OPEN_RESTART_MODAL
    };
}

export function openFeedbackModal() {
    return {
        type: Actions.OPEN_FEEDBACK_MODAL
    };
}

export function openMapsModal() {
    return {
        type: Actions.OPEN_MAPS_MODAL
    };
}

export function openCustomCSSModal() {
    return {
        type: Actions.OPEN_CUSTOMCSS_MODAL
    };
}

export function openLinkChangeModal() {
    return {
        type: Actions.OPEN_LINK_CHANGE_MODAL
    };
}

export function openFormEditModal(target = null) {
    return {
        type: Actions.OPEN_FORMEDIT_MODAL,
        target
    };
}

export function openHelpModal() {
    return {
        type: Actions.OPEN_HELP_MODAL
    };
}

export function closeModal() {
    return {
        type: Actions.CLOSE_MODAL
    };
}
