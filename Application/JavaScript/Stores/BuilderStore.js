import {
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

var builderData = {
  selectedTemplate: null,

  isTabOpened: false,
  currentTabOpened: -1
};

export default createStore(builderData, {
  [PROCESS_TEMPLATE_SELECTION]: (state, action) => {
    ABuilder.setURLHash('#template-' + action.template);
    
    return {
      selectedTemplate: action.template,
      ...state
    }
  },

  [START_NEW_PAGE]: (state, action) => {
    const currentHash = ABuilder.getURLHash();

    if (currentHash.indexOf('page') !== -1) {

    } else {
      ABuilder.setURLHash(currentHash + '/page-unnamed');
    }

  	return state;
  },

  [LOAD_PREVIOUS_PAGE]: (state, action) => {
  	return state;
  },

  [CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE]: (state, action) => {
    if (Storage.get(Storage.keyList.previouspage)) {
      return {
        doesPreviousPageExistInLocalStorage: true,
        ...state
      };
    } else {
      return state;
    }
  },

  [OPEN_TAB]: (state, action) => {
    const targetTabElement = document.querySelector('[data-target="' + action.target + '"]');
    targetTabElement.classList.add('open');

    return {
      isTabOpened: true,
      currentTabOpened: action.target,
      ...state
    };
  },

  [CLOSE_TAB]: (state, action) => {

      const targetTabElement = document.querySelector('.open[data-target]');
      console.log(targetTabElement)
      targetTabElement.classList.remove('open');
      state.isTabOpened = false;
      state.currentTabOpened = -1;
    

    return state;
  },

  [OPEN_PREVIEW]: (state, action) => {
    return state;
  }
});