import {
  CHECK_IF_TEMPLATE_IS_SELECTED,
  PROCESS_TEMPLATE_SELECTION,
  START_NEW_PAGE,
  LOAD_PREVIOUS_PAGE,
  CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE,
  OPEN_TAB,
  CLOSE_TAB,
  OPEN_PREVIEW
} from '../Constants/ActionTypes';
import createStore from '../Common/CreateStore';
import ABuilder from '../Common/ABuilder';
import Storage from '../Common/Storage';

let builderDefaultState = {
  currentLocation: 0, // 0 - Template Selection; 1 - New/Load Page; 2 - Canvas

  doesPreviousPageExistInStorage: false,

  isTemplateSelected: false,
  selectedTemplate: '',

  isTabOpened: false,
  tabOpened: -1,

  currentPage: -1,
  pages: []
};

export default function builder (state = builderDefaultState, action) {
  switch (action.type) {
    case CHECK_IF_TEMPLATE_IS_SELECTED:
      let currentURL = ABuilder.getURLHash();
      let stringPosition = currentURL.indexOf('template-') !== -1;

      if (stringPosition) {
          let template = currentURL.split('/')[0],
            templateName = template.slice(1 + 'template-'.length);

          return {
            ...state,
            currentLocation: 1,
            isTemplateSelected: true,
            selectedTemplate: templateName
          };
      }

      return state;

    case PROCESS_TEMPLATE_SELECTION:
      ABuilder.setURL(ABuilder.TEMPLATE, action.template);

      return {
        ...state,
        currentLocation: 1,
        isTemplateSelected: true,
        selectedTemplate: action.template
      };

    case START_NEW_PAGE:
      if (state.pages.length == 0) {
        let newPage = {
          id: '01',
          title: "Unnamed page",
          HTMLData: []
        };

        state.pages.push(newPage);

        ABuilder.setURL(ABuilder.PAGE, newPage.id);

        Storage.set(Storage.keyList.pages, newPage);

        return {
          ...state,
          currentLocation: 2,
          currentPage: 0
        };
      }

      return state;

    case LOAD_PREVIOUS_PAGE:
      return {
        ...state,
        currentLocation: 2,
        currentPage: 0
      };

    case CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE:
      if (Storage.get(Storage.keyList.pages) !== null) {
        return {
          ...state,
          doesPreviousPageExistInStorage: true
        };
      }

      return state;

    case OPEN_TAB:
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

    case CLOSE_TAB:
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

    case OPEN_PREVIEW:
      return state;

    default:
      return state;
  }
};