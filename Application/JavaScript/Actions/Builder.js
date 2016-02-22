import * as Common from '../Common/Common';
import { getLocalizationFile } from './Localization';
import { checkPreviousPagesInStorage, saveCurrentPage } from './Page';
import { closeTab, closeSidetab } from './Aside';
import IconPacksData from '../../Data/Builder/IconPacks';
import imagesLibraryJSON from '../../Data/Builder/ImagesLibrary';
import Actions from './Constants';
import _ from 'lodash';
import TTEventEmitter from '../TTEventEmitter';

export function runApplicationActions () {
  return (dispatch) => {
    dispatch(initialize());
    dispatch(getBuilderConfiguration());

    Common.getConfiguration((data) => {
      dispatch(receiveConfiguration(data));
      dispatch(proccessConfigurationLocalization());
      dispatch(getLocalizationFile());
      dispatch(initializeBuilder());
      dispatch(getIconPacks());
      dispatch(getImagesLibrary());
      dispatch(initializeEvents());
    });
  };
}

export function initializeEvents () {
  const keyCodes = {
    ESC: 27
  };

  return (dispatch, getState) => {
    const observable = new TTEventEmitter();

    // Event listeners.
    observable.addListener('savecurrentpage', () => {
      dispatch(saveCurrentPage());
    });

    observable.addListener('goback', () => {
      const state = getState();
      const { builder } = state;
      const { isTabOpened, isSidetabOpened } = builder;

      if (isSidetabOpened) {
        dispatch(closeSidetab());
      } else if (!isSidetabOpened && isTabOpened) {
        dispatch(closeTab());
      }
    });

    // Event emitters.
    document.addEventListener('visibilitychange', (e) => {
      const visbilityState = e.target.visibilityState;

      if (visbilityState === 'hidden') {
        observable.emit('savecurrentpage');
      }
    });

    document.addEventListener('keyup', (event) => {
      const keyCode = event.keyCode || event.which;

      if (keyCode === keyCodes.ESC) {
        event.stopPropagation();
        event.preventDefault();

        observable.emit('goback');
      }
    });

    window.setInterval(() => {
      observable.emit('savecurrentpage');
    }, 60000);
  };
}

export function initialize () {
  return {
    type: Actions.INITIALIZE
  };
}

export function removeLoadingScreen () {
  return (dispatch) => {
    dispatch({
      type: Actions.LOGIC_INITIALIZED
    });

    _.delay(() => {
      dispatch({
        type: Actions.REMOVE_LOADING_SCREEN
      });
    }, 250);
  };
}

export function setPageTitle (title) {
  return {
    type: Actions.SET_PAGE_TITLE,
    title: title
  };
}

export function getBuilderConfiguration () {
  return {
    type: Actions.GET_BUILDER_CONFIGURATION
  };
}

export function receiveConfiguration (data) {
  return {
    type: Actions.RECEIVE_BUILDER_CONFIGURATION,
    data: data
  };
}

export function proccessConfigurationLocalization () {
  return {
    type: Actions.PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION
  };
}

export function initializeBuilder () {
  return (dispatch) => {
    dispatch(checkPreviousPagesInStorage());
    dispatch(getTemplateManifest());
    dispatch(getFonts());
  };
}

export function getTemplateManifest () {
  return (dispatch) => {
    Common.getTemplateManifestFile((data) => {
      dispatch(returnTemplateData(data));
    });
  };
}

export function getFonts () {
  return (dispatch) => {
    Common.getFontsList((data) => {
      dispatch({
        type: Actions.GET_FONTS,
        data: data
      });
    });
  };
}

export function returnTemplateData (data) {
  return {
    type: Actions.GET_TEMPLATE_DATA,
    data: data
  };
}

export function uploadImage (data) {
  return {
    type: Actions.UPLOADED_IMAGE,
    data: data
  };
}

export function downloadPages (pages) {
  return {
    type: Actions.DOWNLOAD_PAGES,
    pages: pages
  };
}

export function getIconPacks () {
  return (dispatch) => {
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
  };
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
  };
}

export function getImagesLibrary () {
  return {
    type: Actions.GET_IMAGESLIBRARY,
    data: imagesLibraryJSON
  };
}
