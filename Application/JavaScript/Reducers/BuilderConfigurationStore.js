import {
  RECEIVE_BUILDER_CONFIGURATION,
  PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION
} from '../Constants/ActionTypes';
import { setLanguage } from '../Common/Localization';

export default function builderConfiguration (state = {}, action) {
  switch (action.type) {
    case RECEIVE_BUILDER_CONFIGURATION: 
      return action.data;

    case PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION:
      const localizationSetting = action.data.localization || 'en';
      setLanguage(localizationSetting);
      return action.data;

    default:
      return state; 
  }
};