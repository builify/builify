import { combineReducers } from 'redux';
import localization from './Localization';
import builder from './Builder';
import builderConfiguration from './BuilderConfiguration';
import template from './Template';
import notifications from './Notifications';
import page from './Page';
import canvas from './Canvas';

const allReducers = combineReducers({
	localization,
	builder,
	builderConfiguration,
	template,
	notifications,
	page,
	canvas
});

export default allReducers;
