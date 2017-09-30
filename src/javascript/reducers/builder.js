import {
    assign as _assign,
    find as _find,
    endsWith as _endsWith,
    size as _size,
    join as _join,
    findIndex as _findIndex,
    without as _without,
    words as _words,
    dropRight as _dropRight,
    isArray as _isArray,
    isUndefined as _isUndefined,
    isObject as _isObject
} from 'lodash';
import downloadPages from '../pages/download';
import TTStorage from '../modules/tt-storage';
import * as Actions from '../actions/constants';
import { CurrentLocations, MAXIUMUM_PAGES_IN_STORAGE, TEMPLATE_PAGES_STORAGE_NAME } from '../constants';

const builderInitialState = {
    isLoadingScreenActive: true,
    loadingScreenType: 0,
    currentLocation: 0,

    // Tabs
    currentTab: 'initial',
    blockEditorTabOpened: false,
    blockEditorTarget: null,

    // Pages
    isPageSelected: false,
    doPreviousPagesExistInStorage: false,
    pages: [],

    // Filter
    filterContentBlocksTarget: 'all'
};

function cleanStorageFromOldPages(arr) {
    const arrayLen = arr.length;

    if (arrayLen > (MAXIUMUM_PAGES_IN_STORAGE - 1)) {
        arr.shift();
        cleanStorageFromOldPages(arr);
    }
}

export default function(state = builderInitialState, action) {
    switch (action.type) {
    case Actions.UPLOAD_FILE:
        return _assign({}, state, {});

    case Actions.DELETE_PAGE: {
        const { id } = action;
        const result = _findIndex(state.pages, {
            pageID: id
        });

        if (result !== -1) {
            const pages = _without(state.pages, state.pages[result]);
            const previousPages = !!(pages && pages.length !== 0);

            TTStorage.set(TEMPLATE_PAGES_STORAGE_NAME, pages);

            return _assign({}, state, {
                currentLocation: CurrentLocations.STARTSCREEN,
                isPageSelected: false,
                pages,
                doPreviousPagesExistInStorage: previousPages,
                filterContentBlocksTarget: 'all'
            });
        }

        return state;
    }

    case Actions.OPEN_TAB: {
        const { target } = action;
        const { currentTab, tabs } = state;
        const tab = _find(tabs, {
            id: target
        });

        if (_isObject(tab) && !_endsWith(currentTab, target)) {
            return _assign({}, state, {
                currentTab: `${currentTab}.${target}`
            });
        }

        return state;
    }

    case Actions.OPEN_BLOCKEDITOR_TAB: {
        const { editTarget } = action;

        return _assign({}, state, {
            blockEditorTabOpened: true,
            blockEditorTarget: editTarget
        });
    }

    case Actions.CLOSE_BLOCKEDITOR_TAB:
        return _assign({}, state, {
            blockEditorTabOpened: false,
            blockEditorTarget: null
        });

    case Actions.RECEIVE_ASIDE_CONFIGURATION: {
        return _assign({}, state, action.data);
    }

    case Actions.DOWNLOAD_SINGLE_PAGE: {
        const { currentState } = action;
        const { pages } = state;

        downloadPages(pages, currentState);

        return state;
    }

    case Actions.DOWNLOAD_PAGES: {
        const { currentState } = action;
        const { pages } = state;
        const { pages: selectedPages } = action;
        const selectPagesLength = selectedPages.length;
        const queryPages = [];

        if (selectPagesLength !== 0) {
            for (let i = 0; i < selectPagesLength; i += 1) {
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
            pages,
            doPreviousPagesExistInStorage: previousPages,
            filterContentBlocksTarget: 'all'
        });
    }

    case Actions.SAVE_CURRENT_PAGE: {
        const pages = TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME);

        return _assign({}, state, {
            pages
        });
    }

    case Actions.REMOVE_LOADING_SCREEN:
        return _assign({}, state, {
            isLoadingScreenActive: false
        });

    case Actions.FLUSH_PAGES_IN_STORAGE:
    case Actions.DO_PREVIOUS_PAGES_EXIST_IN_STORAGE: {
        const pagesInStorage = TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME);

        if (!_isUndefined(pagesInStorage) && _isArray(pagesInStorage)) {
            return _assign({}, state, {
                doPreviousPagesExistInStorage: pagesInStorage.length !== 0,
                pages: pagesInStorage
            });
        }

        return _assign({}, state, {
            doPreviousPagesExistInStorage: false,
            pages: []
        });
    }

    case Actions.IMPORT_PAGE: {
        const { page } = action;
        const pagesInStorage = TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME);
        let pagesList = [];

        if (_isUndefined(pagesInStorage)) {
            pagesList.push(page);
            TTStorage.set(TEMPLATE_PAGES_STORAGE_NAME, pagesList);
        } else {
            pagesList = pagesInStorage;
            cleanStorageFromOldPages(pagesList);

            if (_isArray(pagesList)) {
                pagesList.push(page);
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

    case Actions.START_NEW_PAGE: {
        const { pageID, pagesInStorage } = action;
        const pageObject = {
            pageID,
            pageTitle: 'Page Title',
            pageFileName: 'index.html',
            pageFullSource: null,

            navigation: {},
            main: [],
            footer: {},
            blocksCount: 0
        };
        let pagesList = [];

        if (_isUndefined(pagesInStorage)) {
            pagesList.push(pageObject);
            TTStorage.set(TEMPLATE_PAGES_STORAGE_NAME, pagesList);
        } else {
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
        }

        return _assign({}, state, {
            currentTab: _join(_dropRight(splitCurrentTab), '.')
        });
    }

    case Actions.OPEN_PREVIEW:
        if (state.currentLocation === CurrentLocations.TEMPLATESELECTION ||
          state.currentLocation === CurrentLocations.STARTSCREEN) {
            return state;
        }

        return _assign({}, state, {
            currentLocation: CurrentLocations.PREVIEW
        });

    case Actions.CLOSE_PREVIEW:
        return _assign({}, state, {
            currentLocation: CurrentLocations.CANVAS
        });

    case Actions.FILTER_CONTENTBLOCKS: {
        return _assign({}, state, {
            filterContentBlocksTarget: action.target
        });
    }

    default:
        return state;
    }
}
