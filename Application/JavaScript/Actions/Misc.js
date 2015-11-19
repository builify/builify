import { getConfiguration, getTemplateMani, setSessionStoreParameters, randomKey, downloadPages } from '../Common/Common';
import axios from 'axios';
import Actions from './Constants';

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

export function blockWasRenderedToPage (block, elementReference) {
  return {
    type: Actions.BLOCK_WAS_RENDERED_TO_PAGE,
    block: block,
    elementReference: elementReference
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

export function openContentBlockSettings () {
  return {
    type: Actions.OPEN_CONTENTBLOCK_SETTINGS
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

export function openContentblockSourceEditModal (currentHoverBlock) {
  return {
    type: Actions.OPEN_CONTENTBLOCK_SOURCE_EDIT_MODAL,
    currentHoverBlock: currentHoverBlock
  }
}
