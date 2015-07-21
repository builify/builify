import {
  RECEIVE_BUILDER_CONFIGURATION,
  PROCCESS_LOCALIZATION
} from '../Constants/ActionTypes';
import { setLanguage } from '../Common/Localization';

export default function handle (state = {}, action) {
  switch (action.type) {
    case RECEIVE_BUILDER_CONFIGURATION:
      return action.data;

    case PROCCESS_LOCALIZATION:
      const localizationSetting = action.data.localization || 'en';
      setLanguage(localizationSetting);
      
      return state;

    default:
      return state;
  }
};