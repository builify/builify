import { getLocalization } from '../Common/Localization';
import * as ActionTypes from '../Constants/ActionTypes';

export function getLocalizationFile () {
  return (dispatch, getState) => {
    getLocalization((data) => {
      dispatch({
        type: ActionTypes.GET_LOCALIZATION,
        data: data
      });
    });
  };
};