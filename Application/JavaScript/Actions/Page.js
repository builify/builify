import Actions from './Constants';
import Storage from '../Common/Storage';
import TTDOM from '../Common/TTDOM';
import { TEMPLATE_PAGES_STORAGE_NAME } from '../Constants';
import { addNotification } from './Notifications';

export function startNewPage () {
  const pagesInStorage = Storage.get(TEMPLATE_PAGES_STORAGE_NAME);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const uniqueKey = Math.random().toString(36).slice(-8);
  const pageID = `abpage-${currentTimestamp}-${uniqueKey}`;

  return {
    type: Actions.START_NEW_PAGE,
    pageID: pageID,
    pagesInStorage: pagesInStorage
  };
}

export function loadPreviousPage (idx) {
  return {
    type: Actions.LOAD_PREVIOUS_PAGE,
    idx: idx
  };
}

export function checkPreviousPagesInStorage () {
  return {
    type: Actions.DO_PREVIOUS_PAGES_EXIST_IN_STORAGE
  };
}

export function setPageTitle (title) {
  return {
    type: Actions.SET_PAGE_TITLE,
    title: title
  };
}

export function getCurrentPageData () {
  return {
    type: Actions.GET_CURRENT_PAGE_DATA
  };
}

export function saveCurrentPage () {
  return (dispatch) => {
    dispatch(addNotification({
      message: 'Page saved',
      level: 'success'
    }));

    dispatch({
      type: Actions.SAVE_CURRENT_PAGE
    });
  };
}

export function downloadAsHTML () {
  return {
    type: Actions.DOWNLOAD_AS_HTML
  };
}

export function restartPage () {
  return {
    type: Actions.RESTART_PAGE
  };
}

export function setPageTitle (title) {
  const iFrame = TTDOM.iframe.get('ab-cfrm');
  const iFrameWindow = TTDOM.iframe.getWindow(iFrame);

  iFrameWindow.document.title = title;

  return {
    type: Actions.SET_PAGE_TITLE,
    title: title
  };
}

export function setPageFilename (filename) {
  return {
    type: Actions.SET_PAGE_FILENAME,
    filename: filename
  };
}
