import { CurrentLocations } from '../Constants/Defines';
import { setLanguage } from '../Common/Localization';
import { MAXIUMUM_PAGES_IN_STORAGE, ModalTypes } from '../Constants/Defines';
import { randomKey } from '../Common/Common';
import _ from 'lodash';
import Storage from '../Common/Storage';
import * as Actions from '../Constants/Actions';

const builderInitialState = {
  isLoadingScreenActive: true,
  loadingScreenType: 0,

  currentLocation: 0,

  // Tabs
  isTabOpened: false,
  tabOpened: -1,
  isSidetabOpened: false,
  sidetabOpened: -1,

  // Pages
  isPageSelected: false,
  doPreviousPagesExistInStorage: false,
  pages: [],

  // Colorpicker
  isColorPickerOpened: false,
  colorPickerSelectedElement: null,
  colorPickerSelectedElementColorElement: null,

  // Filter
  filterContentBlocksTarget: 'all',

  // Modal
  isModalOpen: false,
  modalType: null,
  modalTarget: null
};

function builder (state = builderInitialState, action) {
  let data = {};

  if (_.has(action, 'data')) {
    data = action.data;
  }

  switch (action.type) {
    case Actions.OPEN_IMAGE_EDIT_MODAL:
      return _.assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.IMAGECHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_ICON_EDIT_MODAL:
      return _.assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.ICONCHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_LINK_EDIT_MODAL:
      return _.assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.LINKCHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_PREVIOUS_PAGES_SELECT_MODAL:
      return _.assign({}, state, {
        isModalOpen: true,
        modalType: ModalTypes.PREVIOUSPAGES
      });

    case Actions.CLOSE_MODAL:
      return _.assign({}, state, {
        isModalOpen: false,
        modalType: null,
        modalTarget: null
      });

    case Actions.REMOVE_LOADING_SCREEN:
      return _.assign({}, state, {
        isLoadingScreenActive: false
      });

    case Actions.DO_PREVIOUS_PAGES_EXIST_IN_STORAGE: {
      const pagesInStorage = Storage.get('ab-pages');

      if (pagesInStorage === null) {
        return state;
      }

      return _.assign({}, state, {
        doPreviousPagesExistInStorage: true,
        pages: pagesInStorage
      });
    }

    case Actions.START_NEW_PAGE: {
      const pagesInStorage = Storage.get('ab-pages');
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const uniqueKey = randomKey();
      const pageID = `abpage-${currentTimestamp}-${uniqueKey}`;
      const pageObject = {
        id: pageID
      };
      let pagesList = [];

      if (pagesInStorage === null) {
        pagesList.push(pageObject);
        Storage.set('ab-pages', pagesList);
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

        pagesList.push(pageObject);
        Storage.set('ab-pages', pagesList);
      }

      return _.assign({}, state, {
        currentLocation: CurrentLocations.CANVAS,
        isPageSelected: true,
        pages: pagesList
      });
    }

    case Actions.CHECK_IF_PAGE_IS_SELECTED:
      return _.assign({}, state, {
        currentLocation: data.isPageSelected ? CurrentLocations.CANVAS : state.currentLocation,
        isPageSelected: data.isPageSelected
      });

    case Actions.LOAD_PREVIOUS_PAGE:
      return state;

    case Actions.OPEN_TAB:
      const { target } = action;
      let openTabElement = document.querySelector('[data-target="' + target + '"]');

      if (openTabElement) {
        openTabElement.classList.add('open');

        return _.assign({}, state, {
          isTabOpened: true,
          tabOpened: target
        });
      } else {
        return state;
      }

    case Actions.CLOSE_TAB:
      let closeTabElement = document.querySelector('[data-target="' + state.tabOpened + '"]');

      if (closeTabElement) {
        closeTabElement.classList.remove('open');

        return _.assign({}, state, {
          isTabOpened: false,
          tabOpened: -1
        });
      } else {
        return state;
      }

    case Actions.OPEN_SIDETAB:
      let sidetabElement = document.querySelector('[data-sidetabid="' + action.target + '"]');

      if (sidetabElement) {
        sidetabElement.classList.add('open');

        return _.assign({}, state, {
          iisSidetabOpened: true,
          sidetabOpened: action.target
        });
      } else {
        return state;
      }

    case Actions.CLOSE_SIDETAB:
      let closeSidetabElement = document.querySelector('[data-sidetabid="' + state.sidetabOpened + '"]');

      if (closeSidetabElement) {
        closeSidetabElement.classList.remove('open');

        return _.assign({}, state, {
          isSidetabOpened: false,
          sidetabOpened: -1
        });
      } else {
        return state;
      }

    case Actions.OPEN_PREVIEW:
      if (state.currentLocation === CurrentLocations.TEMPLATESELECTION ||
          state.currentLocation === CurrentLocations.STARTSCREEN) {
        return state;
      } else {
        return _.assign({}, state, {
          currentLocation: CurrentLocations.PREVIEW
        });
      }

    case Actions.CLOSE_PREVIEW:
      return _.assign({}, state, {
        currentLocation: CurrentLocations.CANVAS
      });

    case Actions.OPEN_COLORPICKER:
      return _.assign({}, state, {
        isColorPickerOpened: true,
        colorPickerSelectedElement: action.target,
        colorPickerSelectedElementColorElement: action.target.querySelector('.ab-color__colorHolder')
      });

    case Actions.CLOSE_COLORPICKER:
      return _.assign({}, state, {
        isColorPickerOpened: false,
        colorPickerSelectedElement: null,
        colorPickerSelectedElementColorElement: null
      });

    case Actions.SET_COLOR_FROM_COLORPICKER:
      if (state.colorPickerTarget) {
        const { color } = action;
        state.colorPickerTarget.style.backgroundColor = '#' + color + '';
      }

      return state;

    case Actions.FILTER_CONTENTBLOCKS:
      let actionTarget = action.target;

      return _.assign({}, state, {
       filterContentBlocksTarget: actionTarget
      });

    case Actions.OPEN_LINK_EDIT_MODAL:
      let linkTarget= action.target;

      return _.assign({}, state, {
        isModalOpen: true,
        modalType: 'linkchange',
        modalTarget: linkTarget
      });

    case Actions.CLOSE_MODAL:
      return _.assign({}, state, {
        isModalOpen: false,
        modalType: null,
        modalTarget: null
      });
  }

  return state;
}

export default builder;
