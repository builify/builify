import { getLocalization } from '../Common/Localization';
import { GetSource } from '../Common/Request';
import { getConfiguration, setSessionStoreParameters, randomKey } from '../Common/Common';
import Storage from '../Common/Storage';
import * as Actions from '../Constants/Actions';

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
  }
}

export function initialize () {
  return {
    type: Actions.INITIALIZE
  }
}

export function removeLoadingScreen () {
  return {
    type: Actions.REMOVE_LOADING_SCREEN
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

// Localization actions.
export function getLocalizationFile () {
  return (dispatch, getState) => {
    getLocalization((data) => {
      dispatch(returnLocalization(data));
    });
  }
}

export function returnLocalization (data) {
  return {
    type: Actions.GET_LOCALIZATION,
    data: data
  }
}

// Builder actions.
export function loadedAsset (asset) {
  return {
    type: Actions.LOADED_ASSET,
    asset: asset
  }
}

export function initializeBuilder () {
  return (dispatch, getState) => {
    dispatch(checkIfPreviousPageExists());
    dispatch(getTemplateManifest());
  }
}

export function getTemplateManifest (template) {
  return (dispatch, getState) => {
    GetSource('/Template/manifest.json',
      (response) => {
        if (response.hasOwnProperty('data')) {
          dispatch(getSelectedTemplateData(response.data));
          dispatch(removeLoadingScreen());
        }
      },
      (response) => {
        console.error(response);
      });
  }
}

export function getSelectedTemplateData (data) {
  return {
    type: Actions.GET_SELECTED_TEMPLATE_DATA,
    data: data
  }
}

export function startNewPage () {
	return {
    type: Actions.START_NEW_PAGE
  }
}

export function loadPreviousPage () {
  return {
    type: Actions.LOAD_PREVIOUS_PAGE
  }
}

export function checkIfPreviousPageExists () {
  let data = {
    doesPreviousPageExistInStorage: false,
    pages: null,
    latestPage: 0
  };
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

    data.doesPreviousPageExistInStorage = true;
    data.pages = storageItem;
    data.latestPage = position;
  }

  return {
    type: Actions.CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE,
    data: data
  }
}

export function openTab (target) {
  return {
    type: Actions.OPEN_TAB,
    target: target
  }
}

export function closeTab () {
  return {
    type: Actions.CLOSE_TAB
  }
}

export function openSidetab (target) {
  return {
    type: Actions.OPEN_SIDETAB,
    target: target
  }
}

export function closeSidetab () {
  return {
    type: Actions.CLOSE_SIDETAB
  }
}

export function openPreview (target) {
  return {
    type: Actions.OPEN_PREVIEW,
    target: target
  }
}

export function closePreview () {
  return {
    type: Actions.CLOSE_PREVIEW
  }
}

export function addNotification (notification) {
  return {
    type: Actions.ADD_NOTIFICATION,
    notification: notification
  }
}

export function eliminateNotification (id) {
  return (dispatch, getState) => {
    dispatch(alertNotificationRemoval(id));

    window.setTimeout(function () {
      dispatch(removeNotification(id));
    }, 500);
  }
}

export function removeNotification (id) {
  return {
    type: Actions.REMOVE_NOTIFICATION,
    id: id
  }
}

export function alertNotificationRemoval (id) {
  const element = document.getElementById('nid-' + String(id));

  if (element) {
    element.classList.add('close');
  }

  return {
    type: Actions.ALERT_NOTIFICATION_FOR_REMOVAL,
    id: id
  }
}

export function removeAllNotifications () {
  return {
    type: Actions.REMOVE_ALL_NOTIFICATIONS
  }
}

export function openColorPicker (target) {
  return {
    type: Actions.OPEN_COLORPICKER,
    target: target
  }
}

export function setColorFromColorPicker (color) {
  return {
    type: Actions.SET_COLOR_FROM_COLORPICKER,
    color: color
  }
}

export function closeColorPicker () {
  return {
    type: Actions.CLOSE_COLORPICKER
  }
}

export function setSwatch (swatch) {
  return {
    type: Actions.SET_SWATCH,
    swatch: swatch
  }
}

export function setFont (font) {
  let doesFontExistInHeadRoot = document.querySelector('[data-fontname="' + font + '"]');

  if (doesFontExistInHeadRoot === null || doesFontExistInHeadRoot === undefined) {
    let headElement = document.getElementsByTagName('head')[0];
    let googleFont = document.createElement('link');

    googleFont.setAttribute('rel', 'stylesheet');
    googleFont.setAttribute('type', 'text/css');
    googleFont.setAttribute('data-fontname', String(font));
    googleFont.setAttribute('href', 'https://fonts.googleapis.com/css?family=' + font);

    headElement.appendChild(googleFont);
  }

  return {
    type: Actions.SET_FONT
  }
}

export function loadContentBlockSource (source, blockType, blockName) {
  return (dispatch, getState) => {
    const contentBlockId = randomKey();

    dispatch(addNotification({
      type: 'loading',
      id: contentBlockId
    }));

    GetSource('/Template/' + String(source),
      (response) => {
        if (response.hasOwnProperty('data')) {
          dispatch(eliminateNotification(contentBlockId));
          dispatch(loadContentBlocksSourceToCanvas(response.data, blockType, blockName));
        }
      });
  }
}

export function loadContentBlocksSourceToCanvas (data, blockType, blockName) {
  return {
    type: Actions.LOAD_CONTENTBLOCK_SOURCE_TO_CANVAS,
    HTMLData: data,
    blockType: blockType,
    blockName: blockName
  }
}

export function filterContentBlocks (target) {
  return {
    type: Actions.FILTER_CONTENTBLOCKS,
    target: target
  }
}

export function openImageEditModal () {
  return {
    type: Actions.OPEN_IMAGE_EDIT_MODAL
  }
}

export function openContextmenuToolbox () {
  return {
    type: Actions.OPEN_CONTEXTMENU_TOOLBOX
  }
}

export function closeContextmenuToolbox () {
  return {
    type: Actions.CLOSE_CONTEXTMENU_TOOLBOX
  }
}

export function openLinkEditModal (target) {
  return {
    type: Actions.OPEN_LINK_EDIT_MODAL,
    target: target
  }
}

export function closeModal () {
  return {
    type: Actions.CLOSE_MODAL
  }
}
