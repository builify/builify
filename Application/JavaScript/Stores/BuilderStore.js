import {
  REMOVE_LOADING_SCREEN,
  CHECK_IF_TEMPLATE_IS_SELECTED,
  PROCESS_TEMPLATE_SELECTION,
  START_NEW_PAGE,
  LOAD_PREVIOUS_PAGE,
  CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE,
  OPEN_TAB,
  CLOSE_TAB,
  OPEN_SIDETAB,
  CLOSE_SIDETAB,
  OPEN_PREVIEW,
  CLOSE_PREVIEW
} from '../Constants/ActionTypes';
import { CurrentLocationEnum } from '../Constants/Enums';
import ABuilder from '../Common/ABuilder';
import Storage from '../Common/Storage';

let builderDefaultState = {
  isLoadingScreenActive: true,

  currentLocation: 0, // 0 - Template Selection; 1 - New/Load Page; 2 - Canvas; 3 - Preview

  doesPreviousPageExistInStorage: false,

  isTemplateSelected: false,
  selectedTemplate: '',

  isTabOpened: false,
  tabOpened: -1,

  isSidetabOpened: false,
  sidetabOpened: -1,

  currentPage: -1,
  pages: []
};

export default function builder (state = builderDefaultState, action) {
  switch (action.type) {
    case REMOVE_LOADING_SCREEN:
      return {
        ...state,
        isLoadingScreenActive: false
      }; 

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
      let newPageId = '01';
      let newPage = {
        id: newPageId,
        title: "Unnamed Page",
        HTMLData: []
      };

      if (state.pages.length === 0) {
        state.pages.push(newPage);
        ABuilder.setURL(ABuilder.PAGE, newPage.id);
      } else {

      }

      return {
        ...state,
        currentLocation: CurrentLocationEnum.CANVAS,
        currentPage: newPageId
      };

    case LOAD_PREVIOUS_PAGE:
      return {
        ...state,
        currentLocation: CurrentLocationEnum.CANVAS
      };

    case CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE:
      if (Storage.get(Storage.keyList.pages) !== null) {
        return {
          ...state,
          doesPreviousPageExistInStorage: true
        };
      }

      return {
        ...state
      };

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

    case OPEN_SIDETAB:
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

    case CLOSE_SIDETAB:
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

    case OPEN_PREVIEW: 
      if (state.currentLocation === CurrentLocationEnum.TEMPLATESELECTION ||
          state.currentLocation === CurrentLocationEnum.STARTSCREEN) {
        return state;
      } else {
        return {
          ...state,
          currentLocation: CurrentLocationEnum.PREVIEW
        };
      }

    case CLOSE_PREVIEW:
      return {
        ...state,
        currentLocation: CurrentLocationEnum.CANVAS
      };

    default:
      return state;
  }
};