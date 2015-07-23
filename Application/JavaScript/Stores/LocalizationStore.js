import {
  GET_LOCALIZATION
} from '../Constants/ActionTypes';
import createStore from '../Common/CreateStore';

export default createStore({}, {
  [GET_LOCALIZATION]: (state, action) => {
    return action.data;
  }
});