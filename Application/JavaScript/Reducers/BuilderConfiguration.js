import { setLanguage } from '../Common/Localization';
import _ from 'lodash';
import * as Actions from '../Constants/Actions';

const builderConfigurationInitialState = {};

function builderConfiguration (state = builderConfigurationInitialState, action) {
  switch (action.type) {
    case Actions.RECEIVE_BUILDER_CONFIGURATION:
      return _.assign({}, state, action.data);

    case Actions.PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION:
      const { localization } = state;

      setLanguage(localization || 'en');

      return state;
  }

  return state;
}

export default builderConfiguration;
