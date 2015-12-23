import { getConfiguration, getTemplateMani, setSessionStoreParameters, randomKey } from '../Common/Common';
import { getLocalizationFile } from './Localization';
import { checkPreviousPagesInStorage, saveCurrentPage } from './Page';
import IconPacksData from '../Data/Builder/IconPacks';
import Actions from './Constants';
import _ from 'lodash';

export function runApplicationActions () {
  return (dispatch, getState) => {
    dispatch(initialize());
    dispatch(getBuilderConfiguration());

    getConfiguration((data) => {
      dispatch(receiveConfiguration(data));
      dispatch(proccessConfigurationLocalization());
      dispatch(getLocalizationFile());
      dispatch(initializeBuilder());
      dispatch(getIconPacks());
      dispatch(initializeEvents());
    });
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

    window.setInterval(() => {
      dispatch(saveCurrentPage());
    }, 60000);
  }
}

export function initialize () {
  return {
    type: Actions.INITIALIZE
  }
}

export function removeLoadingScreen () {
  return (dispatch, getState) => {
    dispatch({
      type: Actions.LOGIC_INITIALIZED
    });

    _.delay(() => {
      dispatch({
        type: Actions.REMOVE_LOADING_SCREEN
      });
    }, 250);
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

export function uploadImage (data) {
  return {
    type: Actions.UPLOADED_IMAGE,
    data: data
  }
}

export function downloadPages (pages) {
  return {
    type: Actions.DOWNLOAD_PAGES,
    pages: pages
  }
}

export function getIconPacks () {
  return (dispatch, getState) => {
    if (_.has(IconPacksData, 'iconPacks')) {
      const { iconPacks } = IconPacksData;

      dispatch(addIconPackSourcesToHead(iconPacks));
      dispatch({
        type: Actions.GET_ICONPACKS,
        iconPacks: iconPacks
      });
    } else {
      throw Error('Iconpacks not found.');
    }
  }
}

export function addIconPackSourcesToHead (iconPacks) {
  const headElement = document.getElementsByTagName('head')[0];

  // Chromium bug.
  // Adding stylesheets at start results scrollbar not working.
  _.delay(() => {
    _.map(iconPacks, (iconPack) => {
      const { iconSource } = iconPack;
      let font = document.createElement('link');

      font.rel = 'stylesheet';
      font.type = 'text/css';
      font.href = iconSource;

      headElement.appendChild(font);
    });
  }, 1000);

  return {
    type: Actions.ADD_ICONPACK_SOURCES_TO_HEAD
  }
}
