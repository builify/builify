import { getConfiguration, getTemplateMani, setSessionStoreParameters, randomKey, downloadPages } from '../Common/Common';
import { getLocalizationFile } from './Localization';
import { checkPreviousPagesInStorage, saveCurrentPage } from './Page';
import Actions from './Constants';

export function runApplicationActions () {
  return (dispatch, getState) => {
    dispatch(initialize());
    dispatch(getBuilderConfiguration());

    getConfiguration((data) => {
      dispatch(receiveConfiguration(data));
      dispatch(proccessConfigurationLocalization());
      dispatch(getLocalizationFile());
      dispatch(initializeBuilder());
    });

    dispatch(initializeEvents());
  }
}

export function initializeEvents () {
  return (dispatch, getState) => {
    // When tab is hidden, automatically save page.
    document.addEventListener('visibilitychange', (e) => {
      const visbilityState = e.target.visibilityState;

      if (visbilityState === 'hidden') {
        dispatch(saveCurrentPage());
      }
    });
  }
}

export function initialize () {
  return {
    type: Actions.INITIALIZE
  }
}

export function removeLoadingScreen () {
  return (dispatch, getState) => {
    window.setTimeout(() => {
      dispatch({
        type: Actions.REMOVE_LOADING_SCREEN
      });
    }, 250);

    window.setTimeout(() => {
      dispatch(saveCurrentPage());
    }, 15000);
  }
}

export function setPageTitle (title) {
  return {
    type: Actions.SET_PAGE_TITLE,
    title: title
  }
}

export function getBuilderConfiguration () {
  return {
    type: Actions.GET_BUILDER_CONFIGURATION
  }
}

export function receiveConfiguration (data) {
  return {
    type: Actions.RECEIVE_BUILDER_CONFIGURATION,
    data: data
  }
}

export function proccessConfigurationLocalization () {
  return {
    type: Actions.PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION
  }
}

export function initializeBuilder () {
  return (dispatch, getState) => {
    dispatch(checkPreviousPagesInStorage());
    dispatch(getTemplateManifest());
  }
}

export function getTemplateManifest (template) {
  return (dispatch, getState) => {
    getTemplateMani((data) => {
      dispatch(returnTemplateData(data));
    });
  }
}

export function returnTemplateData (data) {
  return {
    type: Actions.GET_TEMPLATE_DATA,
    data: data
  }
}
