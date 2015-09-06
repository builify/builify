import { getLocalization } from '../Common/Localization';
import axios from 'axios';
import ABuilder from '../Common/ABuilder';
import Storage from '../Common/Storage';
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

    dispatch(addNotification({
      type: 'info',
      message: 'This is a notification',
      timeout: 5000
    }));
  }
}

export function removeLoadingScreen () {
  return {
    type: ActionTypes.REMOVE_LOADING_SCREEN
  }
}

export function getBuilderConfiguration () {
  return {
    type: ActionTypes.GET_BUILDER_CONFIGURATION
  }
}

export function receiveConfiguration (data) {
  return {
    type: ActionTypes.RECEIVE_BUILDER_CONFIGURATION,
    data: data
  }
}

export function proccessConfigurationLocalization () {
  return {
    type: ActionTypes.PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION
  }
}

// Localization actions.
export function getLocalizationFile () {
  return (dispatch, getState) => {
    getLocalization((data) => {
      dispatch({
        type: ActionTypes.GET_LOCALIZATION,
        data: data
      });
    });
  }
}

// Builder actions.
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
    let template = currentURL.split('/')[0],
      templateName = template.slice(1 + 'template-'.length);

    data.isTemplateSelected = true;
    data.selectedTemplate = templateName;
  }

  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.CHECK_IF_TEMPLATE_IS_SELECTED,
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
    dispatch({
      type: ActionTypes.PROCESS_TEMPLATE_SELECTION,
      template: template
    });

    dispatch(getSelectedTemplateData(template));
  }
}

export function getSelectedTemplateData (template) {
  return (dispatch, getState) => {
    axios.get('/Data/' + template + '/Manifest.json')
      .then((response) => {
        if (response.hasOwnProperty('data')) {
          console.log(response.data);
        }
      })
      .catch(function(response) {
        console.log(response);
      })

    dispatch({
      type: ActionTypes.GET_SELECTED_TEMPLATE_DATA
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
    type: ActionTypes.CHECK_IF_PAGE_IS_SELECTED,
    data: data
  }
}

export function startNewPage () {
	return {
    type: ActionTypes.START_NEW_PAGE
  }
}

export function loadPreviousPage () {
  return {
    type: ActionTypes.LOAD_PREVIOUS_PAGE
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
    type: ActionTypes.CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE,
    data: data
  }
}

export function openTab (target) {
  window.dispatchEvent(new Event('resize'));

  return {
    type: ActionTypes.OPEN_TAB,
    target: target
  }
}

export function closeTab () {
  return {
    type: ActionTypes.CLOSE_TAB
  }
}

export function openSidetab (target) {
  window.dispatchEvent(new Event('resize'));

  return {
    type: ActionTypes.OPEN_SIDETAB,
    target: target
  }
}

export function closeSidetab () {
  return {
    type: ActionTypes.CLOSE_SIDETAB
  }
}

export function openPreview (target) {
  return {
    type: ActionTypes.OPEN_PREVIEW,
    target: target
  }
}

export function closePreview () {
  return {
    type: ActionTypes.CLOSE_PREVIEW
  };
}

export function addNotification (notification) {
  return {
    type: ActionTypes.ADD_NOTIFICATION,
    notification: notification
  }
}

export function removeNotification (notification) {
  return {
    type: ActionTypes.REMOVE_NOTIFICATION,
    notification: notification
  }
}

export function removeAllNotifications () {
  return {
    type: ActionTypes.REMOVE_ALL_NOTIFICATIONS
  }
}

export function openColorPicker (target) {
  return {
    type: ActionTypes.OPEN_COLORPICKER,
    target: target
  }
}

export function setColorFromColorPicker (color) {
  return {
    type: ActionTypes.SET_COLOR_FROM_COLORPICKER,
    color: color
  }
}

export function closeColorPicker () {
  return {
    type: ActionTypes.CLOSE_COLORPICKER
  }
}

export function setSwatch (swatch) {
  return {
    type: ActionTypes.SET_SWATCH,
    swatch: swatch
  }
}

export function setFont (font) {
  let doesFontExistInHeadRoot = document.querySelector('[data-fontname="' + font + '"]');

  console.log(doesFontExistInHeadRoot);

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
    type: ActionTypes.SET_FONT
  }
}