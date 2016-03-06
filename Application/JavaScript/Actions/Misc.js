import _ from 'lodash';
import Actions from './Constants';

export function toggleBaseline (checked) {
  return {
    type: Actions.TOGGLE_BASELINE,
    checked: checked
  };
}

export function addNotification (notification) {
  return {
    type: Actions.ADD_NOTIFICATION,
    notification: notification
  };
}

export function eliminateNotification (id) {
  return (dispatch) => {
    dispatch(alertNotificationRemoval(id));

    window.setTimeout(function () {
      dispatch(removeNotification(id));
    }, 1500);
  };
}

export function removeNotification (id) {
  return {
    type: Actions.REMOVE_NOTIFICATION,
    id: id
  };
}

export function alertNotificationRemoval (id) {
  const element = document.getElementById(`nid-${String(id)}`);

  if (element) {
    element.classList.add('close');
  }

  return {
    type: Actions.ALERT_NOTIFICATION_FOR_REMOVAL,
    id: id
  };
}

export function removeAllNotifications () {
  return {
    type: Actions.REMOVE_ALL_NOTIFICATIONS
  };
}

export function openColorPicker (target) {
  return {
    type: Actions.OPEN_COLORPICKER,
    target: target
  };
}

export function setColorFromColorPicker (color) {
  return {
    type: Actions.SET_COLOR_FROM_COLORPICKER,
    color: color
  };
}

export function closeColorPicker () {
  return {
    type: Actions.CLOSE_COLORPICKER
  };
}

export function setSwatch (swatch) {
  return {
    type: Actions.SET_SWATCH,
    swatch: swatch
  };
}

export function setFont (font) {
  let doesFontExistInHeadRoot = document.querySelector('[data-fontname="' + font + '"]');

  if (doesFontExistInHeadRoot === null || doesFontExistInHeadRoot === undefined) {
    const headElement = document.getElementsByTagName('head')[0];
    let font = document.createElement('link');

    font.rel = 'stylesheet';
    font.type = 'text/css';
    font.href = `https://fonts.googleapis.com/css?family=${font}`;
    font.setAttribute('data-fontname', font);
    headElement.appendChild(font);
  }

  return {
    type: Actions.SET_FONT
  };
}

export function loadContentBlockSource (source, blockType, blockName) {
  return (dispatch) => {
    dispatch(loadContentBlockToPage(source, blockType, blockName));
  };
}

export function selectImage (data) {
  return {
    type: Actions.SELECT_IMAGE,
    data: data
  };
}

export function loadContentBlockToPage (data, blockType, blockName) {
  return {
    type: Actions.LOAD_CONTENTBLOCK_TO_PAGE,
    HTML: data,
    blockType: blockType,
    blockName: blockName
  };
}

export function blockWasRenderedToPage (block, elementReference) {
  return (dispatch, getState) => {
    dispatch({
      type: Actions.BLOCK_WAS_RENDERED_TO_PAGE,
      block: block,
      elementReference: elementReference
    });

    const state = getState();
    const { page } = state;
    const { navigation, main, footer } = page;
    const { type } = block;
    let targetBlock = null;

    if (type === 'navigation') {
      targetBlock = navigation;
    } else if (type === 'footer') {
      targetBlock = footer;
    } else {
      const index = _.findIndex(main, { id: block.id });

      if (index) {
        targetBlock = main[index];
      }
    }

    if (targetBlock && targetBlock.elementReference !== null) {
      targetBlock.elementReference.addEventListener('mouseenter', () => {
        dispatch(currentHoverBlock(targetBlock));
      });
    }
  };
}

export function updateContentBlockSource (block, newSource) {
  return {
    type: Actions.UPDATE_CONTENTBLOCK_SOURCE,
    block: block,
    newSource: newSource
  };
}

export function contentBlockWasUpdated (block) {
  return {
    type: Actions.CONTENTBLOCK_WAS_UPDATED,
    block: block
  };
}

export function currentHoverBlock (block) {
  return {
    type: Actions.CURRENT_HOVER_BLOCK,
    block: block
  };
}

export function removeContentBlock (block) {
  return {
    type: Actions.REMOVE_CONTENTBLOCK,
    block: block
  };
}

export function filterContentBlocks (target) {
  return {
    type: Actions.FILTER_CONTENTBLOCKS,
    target: target
  };
}

export function openContextmenuToolbox () {
  return {
    type: Actions.OPEN_CONTEXTMENU_TOOLBOX
  };
}

export function closeContextmenuToolbox () {
  return {
    type: Actions.CLOSE_CONTEXTMENU_TOOLBOX
  };
}

export function openContentBlockSettings () {
  return {
    type: Actions.OPEN_CONTENTBLOCK_SETTINGS
  };
}

export function sortContentBlocks (evt) {
  return {
    type: Actions.SORT_CONTENTBLOCKS,
    evt: evt
  };
}

export function openContentblockSourceEditModal (currentHoverBlock) {
  return {
    type: Actions.OPEN_CONTENTBLOCK_SOURCE_EDIT_MODAL,
    currentHoverBlock: currentHoverBlock
  };
}
