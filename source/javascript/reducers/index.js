import localization from './localization';
import builder from './builder';
import builderConfiguration from './builder-configuration';
import template from './template';
import notifications from './notifications';
import page from './page';
import canvas from './canvas';
import preview from './preview';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  localization,
  builder,
  builderConfiguration,
  template,
  notifications,
  page,
  canvas,
  preview
});

export default allReducers;
