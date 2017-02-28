import Actions from './constants';
import { addNotification } from './notifications';

export function toggleBaseline (checked) {
  return {
    type: Actions.TOGGLE_BASELINE,
    checked
  };
}

export function openColorPicker (target, sourceElement = null) {
  return {
    type: Actions.OPEN_COLORPICKER,
    target,
    sourceElement
  };
}

export function setColorFromColorPicker (color, targetType) {
  return {
    type: Actions.SET_COLOR_FROM_COLORPICKER,
    color,
    targetType
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
    swatch
  };
}

export function setFont (font) {
  const doesFontExistInHeadRoot = document.querySelector('[data-fontname="' + font + '"]');

  if (doesFontExistInHeadRoot === null || doesFontExistInHeadRoot === undefined) {
    const headElement = document.getElementsByTagName('head')[0];
    const font = document.createElement('link');

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

export function loadContentBlockToPage (block) {
  const { blockType, features, name, source } = block;

  return {
    type: Actions.LOAD_CONTENTBLOCK_TO_PAGE,
    HTML: source,
    blockName: name,
    blockType,
    features
  };
}

export function loadContentBlockSource (block) {
  return function (dispatch) {
    dispatch(loadContentBlockToPage(block));
    dispatch(addNotification({
      message: `Added ${block.blockType} block to page`,
      level: 'success'
    }));
  };
}

export function blockWasRenderedToPage (block, elementReference) {
  return {
    type: Actions.BLOCK_WAS_RENDERED_TO_PAGE,
    block,
    elementReference
  };
}

export function clearPageBlocksCount () {
  return {
    type: Actions.CLEAR_PAGE_BLOCKS_COUNT
  };
}

export function updateContentBlockSource (block, newSource) {
  return {
    type: Actions.UPDATE_CONTENTBLOCK_SOURCE,
    block,
    newSource
  };
}

export function contentBlockWasUpdated (block) {
  return {
    type: Actions.CONTENTBLOCK_WAS_UPDATED,
    block
  };
}

export function currentHoverBlock (elementReference, block) {
  return {
    type: Actions.CURRENT_HOVER_BLOCK,
    elementReference,
    block
  };
}

export function removeContentBlock (block) {
  return {
    type: Actions.REMOVE_CONTENTBLOCK,
    block
  };
}

export function filterContentBlocks (target) {
  return {
    type: Actions.FILTER_CONTENTBLOCKS,
    target
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
    evt
  };
}

export function openContentblockSourceEditModal (currentTarget) {
  return {
    type: Actions.OPEN_CONTENTBLOCK_SOURCE_EDIT_MODAL,
    currentHoverBlock: currentTarget
  };
}

export function setCanvasElementsHoverEvents () {
  return {
    type: Actions.SET_CANVAS_ELEMENTS_HOVER_EVENTS
  };
}

export function setCustomCSS (value) {
  return {
    type: Actions.SET_CUSTOM_CSS,
    value
  };
}
