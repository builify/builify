// Builder's actions
export const INITIALIZE = Symbol.for('INITIALIZE');
export const REMOVE_LOADING_SCREEN = Symbol.for('REMOVE_LOADING_SCREEN');
export const GET_BUILDER_CONFIGURATION = Symbol.for('GET_BUILDER_CONFIGURATION');
export const RECEIVE_BUILDER_CONFIGURATION = Symbol.for('RECEIVE_BUILDER_CONFIGURATION');
export const PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION = Symbol.for('PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION');
export const GET_LOCALIZATION = Symbol.for('GET_LOCALIZATION');
export const LOADED_ASSET = Symbol.for('LOADED_ASSET');

// Template's actions
export const CHECK_IF_TEMPLATE_IS_SELECTED = Symbol.for('CHECK_IF_TEMPLATE_IS_SELECTED');
export const PROCESS_TEMPLATE_SELECTION = Symbol.for('PROCESS_TEMPLATE_SELECTION');
export const GET_SELECTED_TEMPLATE_DATA = Symbol.for('GET_SELECTED_TEMPLATE_DATA');

// Page's actions
export const CHECK_IF_PAGE_IS_SELECTED = Symbol.for('CHECK_IF_PAGE_IS_SELECTED');
export const START_NEW_PAGE = Symbol.for('START_NEW_PAGE');
export const LOAD_PREVIOUS_PAGE = Symbol.for('LOAD_PREVIOUS_PAGE');
export const CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE = Symbol.for('CHECK_IF_PREVIOUS_PAGE_EXISTS_IN_LOCALSTORAGE');

// Tab's actions
export const OPEN_TAB = Symbol.for('OPEN_TAB');
export const CLOSE_TAB = Symbol.for('CLOSE_TAB');
export const OPEN_SIDETAB = Symbol.for('OPEN_SIDETAB');
export const CLOSE_SIDETAB = Symbol.for('CLOSE_SIDETAB');
export const SET_SWATCH = Symbol.for('SET_SWATCH');
export const SET_FONT = Symbol.for('SET_FONT');

// Preview's actions
export const OPEN_PREVIEW = Symbol.for('OPEN_PREVIEW');
export const CLOSE_PREVIEW = Symbol.for('CLOSE_PREVIEW');

// Notification's actions
export const ADD_NOTIFICATION = Symbol.for('ADD_NOTIFICATION');
export const REMOVE_NOTIFICATION = Symbol.for('REMOVE_NOTIFICATION');
export const REMOVE_ALL_NOTIFICATIONS = Symbol.for('REMOVE_ALL_NOTIFICATIONS');

// Colorpicker's actions
export const OPEN_COLORPICKER = Symbol.for('OPEN_COLORPICKER');
export const SET_COLOR_FROM_COLORPICKER = Symbol.for('SET_COLOR_FROM_COLORPICKER');
export const CLOSE_COLORPICKER = Symbol.for('CLOSE_COLORPICKER');

// Tempate design's actions
export const LOAD_CONTENTBLOCK_SOURCE_TO_CANVAS = Symbol.for('LOAD_CONTENTBLOCK_SOURCE_TO_CANVAS');
export const FILTER_CONTENTBLOCKS = Symbol.for('FILTER_CONTENTBLOCKS');