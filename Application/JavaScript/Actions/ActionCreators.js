import { getLocalization } from '../Common/Localization';
import ABuilder from '../Common/ABuilder';
import * as ActionTypes from '../Constants/ActionTypes';

export function runApplicationActions () {
  return (dispatch, getState) => {
    dispatch(getBuilderConfiguration());

    ABuilder.getConfigration((data) => {
      dispatch(receiveConfiguration(data));
      dispatch(proccessConfigurationLocalization());
      dispatch(getLocalizationFile());
      dispatch(initializeBuilder());
      dispatch(removeLoadingScreen());
    }); 
  };
};

export function removeLoadingScreen () {
  return {
    type: ActionTypes.REMOVE_LOADING_SCREEN
  };
};

export function getBuilderConfiguration () {
  return {
    type: ActionTypes.GET_BUILDER_CONFIGURATION
  };
};

export function receiveConfiguration (data) {
  return {
    type: ActionTypes.RECEIVE_BUILDER_CONFIGURATION,
    data: data
  };
};

export function proccessConfigurationLocalization () {
  return {
    type: ActionTypes.PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION
  };
}; 

// Localization actions.
export function getLocalizationFile () {
  return (dispatch, getState) => {
    getLocalization((data) => {
      dispatch({
        type: ActionTypes.GET_LOCALIZATION,
        data: data
      });
    });
  };
};

// Builder actions.
export function initializeBuilder () {
  return (dispatch, getState) => {
    dispatch(checkTemplateSelection());
    dispatch(checkIfPreviousPageExists());
    dispatch(checkIfPageIsSelected());
  };
};

export function checkTemplateSelection () {
  return {
    type: ActionTypes.CHECK_IF_TEMPLATE_IS_SELECTED
  }
};

export function proccessTemplateSelection (template) {
  return {
    type: ActionTypes.PROCESS_TEMPLATE_SELECTION,
    template: template
  };
};

export function checkIfPageIsSelected () {
  return {
    type: ActionTypes.CHECK_IF_PAGE_IS_SELECTED
  };
};

export function startNewPage () {
	return {
    type: ActionTypes.START_NEW_PAGE
  };
};

export function loadPreviousPage () {
  return {
    type: ActionTypes.LOAD_PREVIOUS_PAGE
  };
};

export function checkIfPreviousPageExists () {
  return {
    type: ActionTypes.CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE
  };
};

export function openTab (target) {
  return {
    type: ActionTypes.OPEN_TAB,
    target: target
  };
};

export function closeTab () {
  return {
    type: ActionTypes.CLOSE_TAB
  };
};

export function openSidetab (target) {
  return {
    type: ActionTypes.OPEN_SIDETAB,
    target: target
  };
};

export function closeSidetab () {
  return {
    type: ActionTypes.CLOSE_SIDETAB
  };
};

export function openPreview (target) {
  return {
    type: ActionTypes.OPEN_PREVIEW,
    target: target
  };
};

export function closePreview () {
  return {
    type: ActionTypes.CLOSE_PREVIEW
  };
};

export function setDesignColor () {
  return {
    type: ActionTypes.SET_DESIGN_COLOR
  }
};