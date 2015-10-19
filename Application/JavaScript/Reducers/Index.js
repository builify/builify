import * as localization from './Localization';
import * as builder from './Builder';
import * as builderConfiguration from './BuilderConfiguration';
import * as template from './Template';
import * as notifications from './Notifications';

const allReducers = Object.assign(
	{}, localization, builder, builderConfiguration, template, notifications
);

export default allReducers;
