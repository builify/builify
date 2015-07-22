import {
  GET_LOCALIZATION,
  PROCCESS_LOCALIZATION
} from '../Constants/ActionTypes';
import { setLanguage } from '../Common/Localization';

export default function handle (state = {}, action) {
	if (typeof action === 'undefined' || !action) {
    console.log('Warning: no action defined!');
    return;
  }

  switch (action.type) {
    case GET_LOCALIZATION:
      return action.data;

    case PROCCESS_LOCALIZATION:
      const localizationSetting = action.data.localization || 'en';
      setLanguage(localizationSetting);
      return action.data;

    default:
      return state;
  }
}