import { combineReducers } from 'redux';
import localization from './Localization';
import builder from './Builder';
import builderConfiguration from './BuilderConfiguration';
import theme from './Template';
import notifications from './Notifications';
import page from './Page';
import canvas from './Canvas';

const allReducers = combineReducers({
	localization,
	builder,
	builderConfiguration,
	theme,
	notifications,
	page,
	canvas
});

export default allReducers;
