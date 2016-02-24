import { getLocalization } from '../Common/Localization';
import Actions from './Constants';

export function getLocalizationFile () {
  return (dispatch) => {
    getLocalization((data) => {
      dispatch(returnLocalization(data));
    });
  };
}

export function returnLocalization (data) {
  return {
    type: Actions.GET_LOCALIZATION,
    data: data
  };
}
