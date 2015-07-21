import * as ActionTypes from '../Constants/ActionTypes';
import ABuilder from '../Common/ABuilder';

export function getABuilderConfiguration () {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.GET_BUILDER_CONFIGURATION
    });

    ABuilder.getConfigration((data) => {
      dispatch(receiveConfiguration(data));
      dispatch(proccessLocalization(data));
    });
  };
};

export function receiveConfiguration (data) {
  return {
    type: ActionTypes.RECEIVE_BUILDER_CONFIGURATION,
    data: data
  };
};

export function proccessLocalization (data) {
  return {
    type: ActionTypes.PROCCESS_LOCALIZATION,
    data: data
  };
};