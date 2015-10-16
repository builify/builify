import { getLocalization } from '../Common/Localization';
import { GetSource } from '../Common/Request';
import ABuilder from '../Common/Builder';
import Storage from '../Common/Storage';
import * as Actions from '../Constants/Actions';

export function runApplicationActions () {
  return (dispatch, getState) => {
    dispatch(initialize());
    dispatch(getBuilderConfiguration());

    ABuilder.getConfigration((data) => {
      dispatch(receiveConfiguration(data));
      dispatch(proccessConfigurationLocalization());
      dispatch(getLocalizationFile());
      dispatch(initializeBuilder());
      dispatch(removeLoadingScreen());
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
      dispatch({
        type: Actions.GET_LOCALIZATION,
        data: data
      });
    });
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
    dispatch(checkTemplateSelection());
    dispatch(checkIfPreviousPageExists());
    dispatch(checkIfPageIsSelected());
  }
}

export function checkTemplateSelection () {
  let data = {
    isTemplateSelected: false,
    selectedTemplate: ''
  };
  let currentURL = ABuilder.getURLHash();
  let stringPosition = currentURL.indexOf('template-') !== -1;

  if (stringPosition) {
    let templateNameSplit = currentURL.split('/');
    let templateName = '';

    for (let i = 0; i < templateNameSplit.length; i++) {
      let current = templateNameSplit[i];

      if (current.indexOf('template-') !== -1) {
        templateName = current.substr('template-'.length);
        break;
      }
    }

    data.isTemplateSelected = true;
    data.selectedTemplate = templateName;
  }

  return (dispatch, getState) => {
    dispatch({
      type: Actions.CHECK_IF_TEMPLATE_IS_SELECTED,
      data: data
    });

    if (data.isTemplateSelected) {
      dispatch(getSelectedTemplateData(data.selectedTemplate));
    }
  }
}

export function proccessTemplateSelection (template) {
  ABuilder.setURL(ABuilder.TEMPLATE, template);

  return (dispatch, getState) => {
    dispatch(getSelectedTemplateData(template, true));
  }
}

export function getSelectedTemplateData (template, isTemplateSelection: false) {
  return (dispatch, getState) => {
    GetSource('/templates/' + template + '/manifest.json', 
      (response) => {
        if (response.hasOwnProperty('data')) {
          dispatch({
            type: Actions.GET_SELECTED_TEMPLATE_DATA,
            data: response.data
          });

          if (isTemplateSelection) {
            dispatch({
              type: Actions.PROCESS_TEMPLATE_SELECTION,
              template: template
            });
          }
        }
      });
  }
}

export function checkIfPageIsSelected () {
  let data = {
    isPageSelected: false
  };
  let getCurrentUrl = ABuilder.getURLHash();
  let pagePositionInString = getCurrentUrl.indexOf('page-7');

  if (pagePositionInString !== -1) {
    data.isPageSelected = true;
  }

  return {
    type: Actions.CHECK_IF_PAGE_IS_SELECTED,
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

export function removeNotification (notification) {
  return {
    type: Actions.REMOVE_NOTIFICATION,
    notification: notification
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

export function loadContentBlockSourceToCanvas (source, blockType, blockName, templateName) {
  return (dispatch, getState) => {
    GetSource('/templates/' + String(templateName) + '/' + String(source), 
      (response) => {
        if (response.hasOwnProperty('data')) {
          dispatch({
            type: Actions.LOAD_CONTENTBLOCK_SOURCE_TO_CANVAS,
            HTMLData: response.data,
            blockType: blockType,
            blockName: blockName
          });
        }
      });
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

export function closeImageEditModal () {
  return {
    type: Actions.CLOSE_IMAGE_EDIT_MODAL
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