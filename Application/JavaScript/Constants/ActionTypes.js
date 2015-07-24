import keyMirror from 'react/lib/keyMirror';

export default keyMirror({
  GET_BUILDER_CONFIGURATION: Symbol('GET_BUILDER_CONFIGURATION'),
  RECEIVE_BUILDER_CONFIGURATION: Symbol('RECEIVE_BUILDER_CONFIGURATION'),
  PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION: Symbol('PROCCESS_BUILDER_CONFIGURATION_LOCALIZATION'),
  
  GET_LOCALIZATION: Symbol('GET_LOCALIZATION'),

  PROCESS_TEMPLATE_SELECTION: Symbol('PROCESS_TEMPLATE_SELECTION'),

  START_NEW_PAGE: Symbol('START_NEW_PAGE'),
  LOAD_PREVIOUS_PAGE: Symbol('LOAD_PREVIOUS_PAGE')
});