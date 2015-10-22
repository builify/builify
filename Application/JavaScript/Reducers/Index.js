import * as localization from './Localization';
import * as builder from './Builder';
import * as builderConfiguration from './BuilderConfiguration';
import * as template from './Template';
import * as notifications from './Notifications';
import * as page from './Page';
import * as canvas from './Canvas';

const allReducers = Object.assign({},
	localization,
	builder,
	builderConfiguration,
	template,
	notifications,
	page,
	canvas
);

export default allReducers;
