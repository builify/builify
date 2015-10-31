import { getLocalization } from '../Common/Localization';
import { getConfiguration, getTemplateMani, setSessionStoreParameters, randomKey, downloadPages } from '../Common/Common';
import axios from 'axios';
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
  return (dispatch, getState) => {
    window.setTimeout(() => {
      dispatch({
        type: Actions.REMOVE_LOADING_SCREEN
      })
    }, 250);
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
    getTemplateMani((data) => {
      dispatch(returnTemplateData(data));
      dispatch(removeLoadingScreen());
    });
  }
}

export function returnTemplateData (data) {
  return {
    type: Actions.GET_TEMPLATE_DATA,
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

export function getCurrentPageData () {
  return {
    type: Actions.GET_CURRENT_PAGE_DATA
  }
}

export function downloadAsHTML () {
  return {
    type: Actions.DOWNLOAD_AS_HTML
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

export function setPreviewMode (mode) {
  return {
    type: Actions.SET_PREVIEW_MODE,
    mode: mode
  }
}

export function rotatePreviewView () {
  return {
    type: Actions.PREVIEW_MODE_ROTATE
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
    const headElement = document.getElementsByTagName('head')[0];
    let font = document.createElement('link');

    font.rel = 'stylesheet';
    font.type = 'text/css';
    font.href = `https://fonts.googleapis.com/css?family={font}`;
    font.setAttribute('data-fontname', font);
    headElement.appendChild(font);
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

    axios.get('/Template/' + String(source))
      .then((response) => {
        if (response.hasOwnProperty('data')) {
          dispatch(eliminateNotification(contentBlockId));
          dispatch(loadContentBlockToPage(response.data, blockType, blockName));
        }
      })
      .catch((response) => {
        throw Error(response);
      });
  }
}

export function loadContentBlockToPage (data, blockType, blockName) {
  return {
    type: Actions.LOAD_CONTENTBLOCK_TO_PAGE,
    HTML: data,
    blockType: blockType,
    blockName: blockName
  }
}

export function currentHoverBlock (element) {
  return {
    type: Actions.CURRENT_HOVER_BLOCK,
    element: element
  }
}

export function removeContentBlock (blockElement) {
  return {
    type: Actions.REMOVE_CONTENTBLOCK,
    blockElement: blockElement
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

export function sortContentBlocks (evt) {
  return {
    type: Actions.SORT_CONTENTBLOCKS,
    evt: evt
  }
}

export function geThemeCustomStylesheetSheet (sheet) {
  return {
    type: Actions.GET_THEME_CUSTOM_STYLESHEET_SHEET,
    sheet: sheet
  }
}
