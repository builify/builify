import * as ActionTypes from '../Constants/ActionTypes';

export function proccessTemplateSelection (template) {
  return {
    type: ActionTypes.PROCESS_TEMPLATE_SELECTION,
    template: template
  };
};

export function startNewPage () {
	return {
    type: ActionTypes.START_NEW_PAGE
  };
};

export function loadPreviousPage () {
  return {
    type: ActionTypes.LOAD_PREVIOUS_PAGE
  };
};