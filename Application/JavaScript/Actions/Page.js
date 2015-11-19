import Actions from './Constants';
import Storage from '../Common/Storage';

export function startNewPage () {
  const pagesInStorage = Storage.get('ab-pages');
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const uniqueKey = Math.random().toString(36).slice(-8);
  const pageID = `abpage-${currentTimestamp}-${uniqueKey}`;

	return {
    type: Actions.START_NEW_PAGE,
    pageID: pageID,
    pagesInStorage: pagesInStorage
  }
}

export function loadPreviousPage (idx) {
  return {
    type: Actions.LOAD_PREVIOUS_PAGE,
    idx: idx
  }
}

export function checkPreviousPagesInStorage () {
  return {
    type: Actions.DO_PREVIOUS_PAGES_EXIST_IN_STORAGE
  }
}

export function getCurrentPageData () {
  return {
    type: Actions.GET_CURRENT_PAGE_DATA
  }
}

export function saveCurrentPage () {
  return {
    type: Actions.SAVE_CURRENT_PAGE
  }
}

export function downloadAsHTML () {
  return {
    type: Actions.DOWNLOAD_AS_HTML
  }
}

export function restartPage () {
  return {
    type: Actions.RESTART_PAGE
  }
}
