import * as localization from './Localization';
import * as builder from './Builder';
import * as template from './Template';
import * as notifications from './Notifications';

const allReducers = Object.assign(
	{}, localization, builder, template, notifications
);

export default allReducers;
