import {
  PROCESS_TEMPLATE_SELECTION,
  START_NEW_PAGE,
  LOAD_PREVIOUS_PAGE
} from '../Constants/ActionTypes';
import createStore from '../Common/CreateStore';
import ABuilder from '../Common/ABuilder';

const builderData = {
  'selectedTemplate': null
};

export default createStore(builderData, {
  [PROCESS_TEMPLATE_SELECTION]: (state, action) => {
    ABuilder.setURLHash('#template-' + action.template);
    
    return {
      selectedTemplate: action.template,
      ...state
    }
  },

  [START_NEW_PAGE]: (state, action) => {
  	return state;
  },

  [LOAD_PREVIOUS_PAGE]: (state, action) => {
  	return state;
  }
});