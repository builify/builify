import Actions from './constants';
import _delay from 'lodash/delay';
import _has from 'lodash/has';
import _map from 'lodash/map';
import TTEventEmitter from 'tt-event-emitter';
import stripJSONComments from 'strip-json-comments';
import IconPacksData from '../../../data/builder/icon-packs';
import imagesLibraryJSON from '../../../data/builder/images-library';
import builderConfiguration from '../../../data/builder/builder';
import AsideData from '../../../data/builder/aside';
import fontsList from '../../../data/builder/fonts-list';
import { checkPreviousPagesInStorage, saveCurrentPage } from './page';
import { closeTab, closeSidetab } from './aside';
import { fetch } from '../common/http';
import { addNotification } from './notifications';
import JSZip from 'jszip';

export function runApplicationActions () {
  return function (dispatch) {
    dispatch(initialize());
    dispatch(checkPreviousPagesInStorage());
    dispatch(getBuilderConfiguration());
    dispatch(receiveConfiguration());
    dispatch(receiveAsideConfiguration());
    dispatch(getTemplateFiles());
  };
}

export function getTemplateFiles () {
  return function (dispatch) {
    const zip = new JSZip();
    
    return fetch(`assets/template/arkio.builify`)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }

        return response;
      })
      .then(function (data) {
        zip.loadAsync(data, { base64: true, checkCRC32: true }).then(function () {
          zip.file('manifest.json').async('string')
            .then(function (contents) {
              dispatch({
                type: Actions.GET_TEMPLATE_DATA,
                data: JSON.parse(contents)
              });
              dispatch(getFonts());
              dispatch(getIconPacks());
              dispatch(getImagesLibrary());
              dispatch(initializeEvents());
            });
        });
      });
  };
}

export function initializeEvents () {
  const keyCodes = {
    ESC: 27
  };

  return function (dispatch, getState) {
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
  return function (dispatch) {
    dispatch({
      type: Actions.LOGIC_INITIALIZED
    });

    _delay(() => {
      dispatch({
        type: Actions.REMOVE_LOADING_SCREEN
      });
    }, 500);
  };
}

export function getBuilderConfiguration () {
  return {
    type: Actions.GET_BUILDER_CONFIGURATION
  };
}

export function receiveConfiguration () {
  return {
    type: Actions.RECEIVE_BUILDER_CONFIGURATION,
    data: JSON.parse(stripJSONComments(JSON.stringify(builderConfiguration)))
  };
}

export function receiveAsideConfiguration () {
  return {
    type: Actions.RECEIVE_ASIDE_CONFIGURATION,
    data: JSON.parse(stripJSONComments(JSON.stringify(AsideData)))
  };
}

export function getFonts () {
  return {
    type: Actions.GET_FONTS,
    data: JSON.parse(stripJSONComments(JSON.stringify(fontsList)))
  };
}

export function getIconPacks () {
  return function (dispatch) {
    if (_has(IconPacksData, 'iconPacks')) {
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

export function uploadImage (data) {
  return {
    type: Actions.UPLOADED_IMAGE,
    data: data
  };
}

export function downloadSinglePage () {
  return function (dispatch, getState) {
    dispatch({
      type: Actions.DOWNLOAD_SINGLE_PAGE,
      currentState: getState()
    });
  };
}

export function downloadPages (pages) {
  return function (dispatch, getState) {
    dispatch({
      type: Actions.DOWNLOAD_PAGES,
      pages: pages,
      currentState: getState()
    });
  };
}

export function noPagesToDownload () {
  return function (dispatch) {
    dispatch({ type: Actions.NO_PAGES_TO_DOWNLOAD });
    dispatch(addNotification({
      message: 'No pages to download!',
      level: 'info'
    }));
  };
}

export function addIconPackSourcesToHead (iconPacks) {
  const headElement = document.getElementsByTagName('head')[0];

  // Chromium bug.
  // Adding stylesheets at start results scrollbar not working.
  _delay(() => {
    _map(iconPacks, (iconPack) => {
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

export function cloneItem () {
  return {
    type: Actions.CLONE_ITEM
  };
}

export function changeBaseFontSize (value) {
  return {
    type: Actions.CHANGE_BASE_FONT_SIZE,
    value: value
  };
}

export function changeBaselineValue (value) {
  return {
    type: Actions.CHANGE_BASELINE_VALUE,
    value: value
  };
}

export function sendFeedBack () {
  return function (dispatch) {
    dispatch({ type: Actions.SEND_FEEDBACK });
    dispatch(addNotification({
      message: 'Feedback sent!',
      level: 'info'
    }));
  };
}
