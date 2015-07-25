import { getLocalization } from '../Common/Localization';
import ABuilder from '../Common/ABuilder';
import * as ActionTypes from '../Constants/ActionTypes';

// Builder configuration actions.
export function getABuilderConfiguration () {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.GET_BUILDER_CONFIGURATION
    });

    ABuilder.getConfigration((data) => {
      dispatch(receiveConfiguration(data));
      dispatch(proccessConfigurationLocalization(data));
      dispatch(getLocalizationFile());
      dispatch(initialize());
    });
  };
};

export function receiveConfiguration (data) {
  return {
    type: ActionTypes.RECEIVE_BUILDER_CONFIGURATION,
    data: data
  };
};

export function proccessConfigurationLocalization (data) {
  return {
    type: ActionTypes.PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION,
    data: data
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
export function initialize () {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE
    });
  };
};

export function proccessTemplateSelection (template) {
  return {
    type: ActionTypes.PROCESS_TEMPLATE_SELECTION,
    template: template
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

export function openPreview (target) {
  return (
    type: ActionTypes.OPEN_PREVIEW
  );
};