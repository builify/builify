import ABuilder from '../Common/ABuilder';
import * as ActionTypes from '../Constants/ActionTypes';

export function getABuilderConfiguration () {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.GET_BUILDER_CONFIGURATION
    });

    ABuilder.getConfigration((data) => {
      dispatch(receiveConfiguration(data));
      dispatch(proccessConfigurationLocalization(data));
    });
  };
};

export function receiveConfiguration (data) {
  return {
    type: ActionTypes.RECEIVE_BUILDER_CONFIGURATION,
    data: data
  };
};

export function proccessConfigurationLocalization (data) {
  return {
    type: ActionTypes.PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION,
    data: data
  };
};