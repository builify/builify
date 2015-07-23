import {
  PROCESS_TEMPLATE_SELECTION
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
  }
});