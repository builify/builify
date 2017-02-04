import Actions from './constants';
import TTStorage from '../modules/tt-storage';
import processImportedPage from '../pages/import-page';
import { IS_DEMO_VERSION, TEMPLATE_PAGES_STORAGE_NAME, CurrentLocations } from '../constants';
import { addNotification, demoNotification } from './notifications';
import { generatePageID } from '../common/misc';

export function startNewPage () {
  return {
    type: Actions.START_NEW_PAGE,
    pageID: generatePageID(),
    pagesInStorage: TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME)
  };
}

export function loadPreviousPage (idx) {
  return {
    type: Actions.LOAD_PREVIOUS_PAGE,
    idx
  };
}

export function checkPreviousPagesInStorage () {
  return {
    type: Actions.DO_PREVIOUS_PAGES_EXIST_IN_STORAGE
  };
}

export function flushPagesInStorage () {
  return {
    type: Actions.FLUSH_PAGES_IN_STORAGE
  };
}

export function getCurrentPageData () {
  return {
    type: Actions.GET_CURRENT_PAGE_DATA
  };
}

export function saveCurrentPage () {
  return function (dispatch, getState) {
    const { builder } = getState();
    const { currentLocation } = builder;

    if (currentLocation === CurrentLocations.STARTSCREEN) {
      return;
    }

    dispatch({ type: Actions.SAVE_CURRENT_PAGE });
    dispatch(addNotification({
      message: 'Page saved',
      level: 'success'
    }));
  };
}

export function downloadAsHTML () {
  return function (dispatch) {
    if (IS_DEMO_VERSION) {
      dispatch(demoNotification());
    } else {
      dispatch({ type: Actions.DOWNLOAD_AS_HTML });
    }
  };
}

export function restartPage () {
  return {
    type: Actions.RESTART_PAGE
  };
}

export function setPageTitle (title) {
  return {
    type: Actions.SET_PAGE_TITLE,
    title
  };
}

export function setPageFilename (filename) {
  return {
    type: Actions.SET_PAGE_FILENAME,
    filename
  };
}

export function importPage (data) {
  return function (dispatch) {
    if (IS_DEMO_VERSION) {
      dispatch(demoNotification());
    } else {
      dispatch({
        type: Actions.IMPORT_PAGE,
        page: processImportedPage(data)
      });
    }
  };
}

export function exportPage () {
  return function (dispatch) {
    if (IS_DEMO_VERSION) {
      dispatch(demoNotification());
    } else {
      dispatch({ type: Actions.EXPORT_PAGE });
    }
  };
}

export function deletePage (id) {
  return {
    type: Actions.DELETE_PAGE,
    id
  };
}
