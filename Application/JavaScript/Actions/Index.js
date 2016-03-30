import * as ASideActions from './ASide';
import * as BuilderActions from './Builder';
import * as LocalizationActions from './Localization';
import * as DialogActions from './Dialog';
import * as PageActions from './Page';
import * as PreviewActions from './Preview';
import * as MiscActions from './Misc';
import * as NotificationActions from './Notifications';
import _ from 'lodash';

const allActions = _.assign({},
  BuilderActions,
  ASideActions,
  LocalizationActions,
  DialogActions,
  PageActions,
  PreviewActions,
  MiscActions,
  NotificationActions
);

export default allActions;
