import {
  RECEIVE_BUILDER_CONFIGURATION,
  PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION
} from '../Constants/ActionTypes';
import { setLanguage } from '../Common/Localization';
import createStore from '../Common/CreateStore';

export default createStore({}, {
  [RECEIVE_BUILDER_CONFIGURATION]: (state, action) => {
    return action.data;
  },

  [PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION]: (state, action) => {
    const localizationSetting = action.data.localization || 'en';
    setLanguage(localizationSetting);
    return action.data;
  }
});