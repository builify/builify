import _assign from 'lodash/assign';
import _find from 'lodash/find';
import _isObject from 'lodash/isobject';
import _endsWith from 'lodash/endswith';
import _size from 'lodash/size';
import _isArray from 'lodash/isarray';
import _isUndefined from 'lodash/isundefined';
import _join from 'lodash/join';
import _words from 'lodash/words';
import _dropRight from 'lodash/dropright';
import downloadPages from '../common/download-pages';
import TTStorage from '../modules/tt-storage';
import * as Actions from '../actions/constants';
import { CurrentLocations, MAXIUMUM_PAGES_IN_STORAGE, TEMPLATE_PAGES_STORAGE_NAME, DialogTypes } from '../constants';

const builderInitialState = {
  isLoadingScreenActive: true,
  loadingScreenType: 0,
  currentLocation: 0,

  // Tabs
  currentTab: 'initial',

  // Pages
  isPageSelected: false,
  doPreviousPagesExistInStorage: false,
  pages: [],

  // Filter
  filterContentBlocksTarget: 'all',

  // Modal
  isModalOpen: false,
  modalType: -1,
  modalTarget: null
};

export default function builder (state = builderInitialState, action) {
  switch (action.type) {
    case Actions.UPLOAD_FILE:
     return _assign({}, state, {});

    case Actions.OPEN_TAB: {
      const { target } = action;
      const { currentTab, tabs } = state;
      const tab = _find(tabs, {
        'id': target
      });

      if (_isObject(tab) && !_endsWith(currentTab, target)) {
        return _assign({}, state, {
          currentTab: `${currentTab}.${target}`
        });
      }

      return state;
    }

    case Actions.RECEIVE_ASIDE_CONFIGURATION: {
      return _assign({}, state, action.data);
    }

    case Actions.DOWNLOAD_PAGES: {
      const { currentState } = action;
      const { pages } = state;
      const { pages: selectedPages } = action;
      const selectPagesLength = selectedPages.length;
      let queryPages = [];

      if (selectPagesLength !== 0) {
        for (let i = 0; i < selectPagesLength; i++) {
          queryPages.push(pages[selectedPages[i]]);
        }

        downloadPages(queryPages, currentState);
      }

      return state;
    }

    case Actions.RESTART_PAGE: {
      const pages = TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME);
      const previousPages = !!(pages && pages.length !== 0);

      return _assign({}, state, {
        currentLocation: CurrentLocations.STARTSCREEN,
        isPageSelected: false,
        pages: pages,
        doPreviousPagesExistInStorage: previousPages
      });
    }

    case Actions.SAVE_CURRENT_PAGE: {
      const pages = TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME);

      return _assign({}, state, {
        pages: pages
      });
    }

    case Actions.OPEN_IMAGE_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.IMAGECHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_COUNTDOWN_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.COUNTDOWN,
        modalTarget: action.target
      });

    case Actions.OPEN_ICON_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.ICONCHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_VIDEO_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.VIDEOEDIT,
        modalTarget: action.target
      });

    case Actions.OPEN_LINK_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.LINKCHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_PREVIOUS_PAGES_SELECT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.PREVIOUSPAGES
      });

    case Actions.OPEN_CONTENTBLOCK_SOURCE_EDIT_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.CONTENTBLOCKSOURCE,
        modalTarget: action.currentHoverBlock
      });

    case Actions.OPEN_DOWNLOAD_MODAL: {
      const { pages } = state;
      const pagesSize = _size(pages);

      if (pagesSize === 1) {
        const { currentState } = action;

        downloadPages(pages, currentState);
      } else if (pagesSize > 1) {
        return _assign({}, state, {
          isModalOpen: true,
          modalType: DialogTypes.DOWNLOADPAGES
        });
      }

      return state;
    }

    case Actions.OPEN_RESTART_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.RESTART
      });

    case Actions.OPEN_FEEDBACK_MODAL:
      return _assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.FEEDBACK
      });

    case Actions.CLOSE_MODAL:
      return _assign({}, state, {
        isModalOpen: false,
        modalType: null,
        modalTarget: null
      });

    case Actions.REMOVE_LOADING_SCREEN:
      return _assign({}, state, {
        isLoadingScreenActive: false
      });

    case Actions.FLUSH_PAGES_IN_STORAGE:
    case Actions.DO_PREVIOUS_PAGES_EXIST_IN_STORAGE: {
      const pagesInStorage = TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME);

      if (!_isUndefined(pagesInStorage) && _isArray(pagesInStorage)) {
        return _assign({}, state, {
          doPreviousPagesExistInStorage: true,
          pages: pagesInStorage
        });
      }

      return _assign({}, state, {
        doPreviousPagesExistInStorage: false,
        pages: []
      });
    }

    case Actions.START_NEW_PAGE: {
      const { pageID, pagesInStorage } = action;
      const pageObject = {
        pageID: pageID,
        pageTitle: 'Page Title',
        pageFileName: 'index.html',
        pageFullSource: null,

        navigation: {},
        main: [],
        footer: {},
        blocksCount: 0
      };
      let pagesList = [];

      if (pagesInStorage === undefined) {
        pagesList.push(pageObject);
        TTStorage.set(TEMPLATE_PAGES_STORAGE_NAME, pagesList);
      } else {
        const cleanStorageFromOldPages = (arr) => {
          let arrayLen = arr.length;

          if (arrayLen > (MAXIUMUM_PAGES_IN_STORAGE - 1)) {
            arr.shift();
            cleanStorageFromOldPages(arr);
          }
        };

        pagesList = pagesInStorage;
        cleanStorageFromOldPages(pagesList);

        if (_isArray(pagesList)) {
          pagesList.push(pageObject);
          TTStorage.set(TEMPLATE_PAGES_STORAGE_NAME, pagesList);
        } else {
          throw Error('Pages data type mismatches with storage pages.');
        }
      }

      return _assign({}, state, {
        currentLocation: CurrentLocations.CANVAS,
        isPageSelected: true,
        pages: pagesList
      });
    }

    case Actions.CHECK_IF_PAGE_IS_SELECTED: {
      const { data } = action;

      return _assign({}, state, {
        currentLocation: data.isPageSelected ? CurrentLocations.CANVAS : state.currentLocation,
        isPageSelected: data.isPageSelected
      });
    }

    case Actions.IMPORT_PAGE:
    case Actions.LOAD_PREVIOUS_PAGE:
      return _assign({}, state, {
        currentLocation: CurrentLocations.CANVAS,
        isPageSelected: true
      });

    case Actions.CLOSE_TAB: {
      const { currentTab } = state;
      const splitCurrentTab = _words(currentTab, /[^.]+/g);
      const splitSize = _size(splitCurrentTab);

      if (splitSize === 1) {
        return _assign({}, state);
      } else {
        return _assign({}, state, {
          currentTab: _join(_dropRight(splitCurrentTab), '.')
        });
      }
    }

    case Actions.OPEN_PREVIEW:
      if (state.currentLocation === CurrentLocations.TEMPLATESELECTION ||
          state.currentLocation === CurrentLocations.STARTSCREEN) {
        return state;
      } else {
        return _assign({}, state, {
          currentLocation: CurrentLocations.PREVIEW
        });
      }

    case Actions.CLOSE_PREVIEW:
      return _assign({}, state, {
        currentLocation: CurrentLocations.CANVAS
      });

    case Actions.FILTER_CONTENTBLOCKS: {
      return _assign({}, state, {
        filterContentBlocksTarget: action.target
      });
    }
  }

  return state;
}
