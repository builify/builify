import { CurrentLocationEnum } from '../Constants/Defines';
import { setLanguage } from '../Common/Localization';
import { MAXIUMUM_PAGES_IN_STORAGE } from '../Constants/Defines';
import ABuilder from '../Common/Builder';
import Storage from '../Common/Storage';
import * as Actions from '../Constants/Actions';

const notificationsInitialState = [];
const notificationDefaultProps = {
  type: null,
  message: null,
  timeout: null
};

export function notifications (state = notificationsInitialState, action) {
  switch (action.type) {
    case Actions.ADD_NOTIFICATION:
      const { notification } = action;
      const notificaionItem = Object.assign(notificationDefaultProps, notification);

      return [...state, notificaionItem]
  }

  return state;
}

const builderConfigurationInitialState = {};
const builderInitialState = {
  isLoadingScreenActive: true,

  currentLocation: 0, // 0 - Template Selection; 1 - New/Load Page; 2 - Canvas; 3 - Preview

  // Template selection
  isTemplateSelected: false,
  selectedTemplate: '',

  // Tabs
  isTabOpened: false,
  tabOpened: -1,
  isSidetabOpened: false,
  sidetabOpened: -1,

  // Pages
  isPageSelected: false,
  doesPreviousPageExistInStorage: false,
  currentPage: -1,
  latestPage: -1,
  pages: [],

  // Colorpicker
  isColorPickerOpened: false,
  colorPickerTarget: null,

  // Template related
  selectedTemplateData: {},

  // Canvas related
  canvasContentBlocks: []
};

export function builderConfiguration (state = builderConfigurationInitialState, action) {
  switch (action.type) {
    case Actions.RECEIVE_BUILDER_CONFIGURATION: 
      return Object.assign({}, state, action.data);

    case Actions.PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION:
      const { localization } = state;

      setLanguage(localization || 'en');

      return state;
  }

  return state;
}
 
export function builder (state = builderInitialState, action) {
  let data = {};

  if (action.hasOwnProperty('data')) {
    data = action.data;
  }

  switch (action.type) {
    case Actions.REMOVE_LOADING_SCREEN:
      return Object.assign({}, state, {
        isLoadingScreenActive: false
      });

    case Actions.CHECK_IF_TEMPLATE_IS_SELECTED:
      return Object.assign({}, state, {
        currentLocation: data.isTemplateSelected ? CurrentLocationEnum.STARTSCREEN : state.currentLocation,
        isTemplateSelected: data.isTemplateSelected,
        selectedTemplate: data.selectedTemplate
      });

    case Actions.PROCESS_TEMPLATE_SELECTION:
      return Object.assign({}, state, {
        currentLocation: CurrentLocationEnum.STARTSCREEN,
        isTemplateSelected: true, 
        selectedTemplate: action.template
      });

    // Pages related.
    case Actions.CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE:
      return Object.assign({}, state, {
        doesPreviousPageExistInStorage: data.doesPreviousPageExistInStorage,
        pages: data.pages,
        latestPage: data.latestPage
      });

    case Actions.CHECK_IF_PAGE_IS_SELECTED:
      return Object.assign({}, state, {
        currentLocation: data.isPageSelected ? CurrentLocationEnum.CANVAS : state.currentLocation,
        isPageSelected: data.isPageSelected
      });

    case Actions.START_NEW_PAGE:
      let pagesStorage = Storage.get('ab-pages');
      let timeStamp = new Date();
      let pageId = 'page-7' + (Math.round(timeStamp.getTime() / 1000)).toString();
      let newPage = {
        'id': pageId,
        'title': 'Unnamed title',
        'data': {
          header: '',
          main: '',
          footer: ''
        }
      };
      let newPages = state.pages;

      if (newPages === undefined) {
        return state;
      }

      if (newPages.length > 1) {
        let cleanStorageFromOldPages = (arr) => {
          let arrayLen = arr.length;

          if (arrayLen > (MAXIUMUM_PAGES_IN_STORAGE - 1)) {
            arr.shift();

            cleanStorageFromOldPages(arr);
          }
        };

        cleanStorageFromOldPages(newPages);
      }

      newPages.push(newPage);

      Storage.set('ab-pages', newPages);
      ABuilder.setURL(ABuilder.PAGE, pageId);

      return Object.assign({}, state, {
        currentLocation: CurrentLocationEnum.CANVAS,
        isPageSelected: true,
        pages: newPages
      });

    case Actions.LOAD_PREVIOUS_PAGE:
      let pagesSize = state.pages.length;

      if (pagesSize > 0) {
        ABuilder.setURL(ABuilder.PAGE, state.pages[state.latestPage].id);

        return Object.assign({}, state, {
          currentLocation: CurrentLocationEnum.CANVAS,
          isPageSelected: true
        });
      } else {
        return state;
      }

    case Actions.OPEN_TAB:
      const { target } = action;
      let openTabElement = document.querySelector('[data-target="' + target + '"]');

      if (openTabElement) {
        openTabElement.classList.add('open');

        return Object.assign({}, state, {
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

        return Object.assign({}, state, {
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

        return Object.assign({}, state, {
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

        return Object.assign({}, state, {
          isSidetabOpened: false,
          sidetabOpened: -1
        });
      } else {
        return state;
      }

    case Actions.OPEN_PREVIEW: 
      if (state.currentLocation === CurrentLocationEnum.TEMPLATESELECTION ||
          state.currentLocation === CurrentLocationEnum.STARTSCREEN) {
        return state;
      } else {
        return Object.assign({}, state, {
          currentLocation: CurrentLocationEnum.PREVIEW
        });
      }

    case Actions.CLOSE_PREVIEW:
      return Object.assign({}, state, {
        currentLocation: CurrentLocationEnum.CANVAS
      });

    case Actions.OPEN_COLORPICKER:
      return Object.assign({}, state, {
        isColorPickerOpened: true,
        colorPickerTarget: action.target
      });

    case Actions.SET_COLOR_FROM_COLORPICKER:
      if (state.colorPickerTarget) {
        const { color } = action;
        state.colorPickerTarget.style.backgroundColor = '#' + color + '';
      }

      return state;

    case Actions.CLOSE_COLORPICKER:
      return Object.assign({}, state, {
        isColorPickerOpened: false,
        colorPickerTarget: null
      });

    case Actions.GET_SELECTED_TEMPLATE_DATA:
      return Object.assign({}, state, {});

    case Actions.LOAD_CONTENTBLOCK_SOURCE_TO_CANVAS:
      const { HTMLData } = action;
      let newCanvasContentBlocks = state.canvasContentBlocks;

      newCanvasContentBlocks.push({
        HTML: HTMLData
      });
      
      return Object.assign({}, state, {
        canvasContentBlocks: newCanvasContentBlocks
      });
  }

  return state;
}