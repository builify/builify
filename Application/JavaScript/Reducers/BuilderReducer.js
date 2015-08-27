import { CurrentLocationEnum } from '../Constants/Enums';
import { setLanguage } from '../Common/Localization';
import { MAXIUMUM_PAGES_IN_STORAGE } from '../Constants/Defines';
import ABuilder from '../Common/ABuilder';
import Storage from '../Common/Storage';
import * as Actions from '../Constants/ActionTypes';

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
  pages: [] 
};

export function builderConfiguration (state = builderConfigurationInitialState, action) {
  switch (action.type) {
    case Actions.RECEIVE_BUILDER_CONFIGURATION: 
      const { data } = action;

      return data;

    case Actions.PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION:
      const { localization } = state;

      setLanguage(localization || 'en');

      return state;
  }

  return state;
}
 
export function builder (state = builderInitialState, action) {
  switch (action.type) {
    case Actions.REMOVE_LOADING_SCREEN:
      if (state.isTemplateSelected) {
        return {
          ...state,

          isLoadingScreenActive: false
        }
      } else {
        return {
          ...state,

          currentLocation: CurrentLocationEnum.TEMPLATESELECTION,
          isLoadingScreenActive: false
        }
      }

    case Actions.CHECK_IF_TEMPLATE_IS_SELECTED:
      let currentURL = ABuilder.getURLHash();
      let stringPosition = currentURL.indexOf('template-') !== -1;

      if (stringPosition) {
          let template = currentURL.split('/')[0],
            templateName = template.slice(1 + 'template-'.length);

          return {
            ...state,
            currentLocation: CurrentLocationEnum.STARTSCREEN,
            isTemplateSelected: true,
            selectedTemplate: templateName
          };
      }
 
      return state;

    case Actions.PROCESS_TEMPLATE_SELECTION:
      ABuilder.setURL(ABuilder.TEMPLATE, action.template);

      return {
        ...state,
        currentLocation: CurrentLocationEnum.STARTSCREEN,
        isTemplateSelected: true, 
        selectedTemplate: action.template
      };




    // Pages related.
    case Actions.CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE:
      let storageItem = Storage.get('ab-pages');

      if (storageItem) {
        let pagesSize = storageItem.length;
        let sizes = [];

        for (let i = 0; i < pagesSize; i++) {
          let page = storageItem[i];

          if (typeof page === 'object' && page.hasOwnProperty('id')) {
            let timestamp = parseInt(page.id.substr('page-7'.length));
            sizes.push(timestamp);
          }
        }

        let largest = Math.max.apply(Math, sizes);
        let position = sizes.indexOf(largest);

        return {
          ...state,

          doesPreviousPageExistInStorage: true,
          pages: storageItem,
          latestPage: position
        }
      } else {

        return state;
      }

    case Actions.CHECK_IF_PAGE_IS_SELECTED:
      let getCurrentUrl = ABuilder.getURLHash();
      let pagePositionInString = getCurrentUrl.indexOf('page-7');

      if (pagePositionInString !== -1) {
        return {
          ...state,

          currentLocation: CurrentLocationEnum.CANVAS,
          isPageSelected: true,
        }
      }


      return state;

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

      return {
        ...state,

        currentLocation: CurrentLocationEnum.CANVAS,
        isPageSelected: true,
        pages: newPages
      }

    case Actions.LOAD_PREVIOUS_PAGE:
      let pagesSize = state.pages.length;

      if (pagesSize > 0) {
        ABuilder.setURL(ABuilder.PAGE, state.pages[state.latestPage].id);

        return {
          ...state,

          currentLocation: CurrentLocationEnum.CANVAS,
          isPageSelected: true
        }
      }

      return state;




    case Actions.OPEN_TAB:
      const { target } = action;
      let openTabElement = document.querySelector('[data-target="' + target + '"]');

      if (openTabElement) {
        openTabElement.classList.add('open');

        return {
          ...state,
          isTabOpened: true,
          tabOpened: target
        };
      }

      return state;

    case Actions.CLOSE_TAB:
      let closeTabElement = document.querySelector('[data-target="' + state.tabOpened + '"]');

      if (closeTabElement) {
        closeTabElement.classList.remove('open');

        return {
          ...state,
          isTabOpened: false,
          tabOpened: -1
        };
      }

      return state;

    case Actions.OPEN_SIDETAB:
      let sidetabElement = document.querySelector('[data-sidetabid="' + action.target + '"]');
      
      if (sidetabElement) {
        sidetabElement.classList.add('open');

        return {
          ...state,
          isSidetabOpened: true,
          sidetabOpened: action.target
        };
      }

      return state;

    case Actions.CLOSE_SIDETAB:
      let closeSidetabElement = document.querySelector('[data-sidetabid="' + state.sidetabOpened + '"]');

      if (closeSidetabElement) {
        closeSidetabElement.classList.remove('open');

        return {
          ...state,
           isSidetabOpened: false,
          sidetabOpened: -1
        };
      }
      
      return state;

    case Actions.OPEN_PREVIEW: 
      if (state.currentLocation === CurrentLocationEnum.TEMPLATESELECTION ||
          state.currentLocation === CurrentLocationEnum.STARTSCREEN) {
        return state;
      } else {
        return {
          ...state,
          currentLocation: CurrentLocationEnum.PREVIEW
        };
      }

    case Actions.CLOSE_PREVIEW:
      return {
        ...state,
        currentLocation: CurrentLocationEnum.CANVAS
      };
  }

  return state;
}