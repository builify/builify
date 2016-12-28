import builder from './builder';
import builderConfiguration from './builder-configuration';
import template from './template';
import notifications from './notifications';
import page from './page';
import canvas from './canvas';
import preview from './preview';
import assets from './assets';
import modals from './modals';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  builder,
  builderConfiguration,
  modals,
  template,
  notifications,
  page,
  canvas,
  preview,
  assets
});

export default allReducers;
