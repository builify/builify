import * as ASideActions from './ASide';
import * as BuilderActions from './Builder';
import * as LocalizationActions from './Localization';
import * as DialogActions from './Dialog';
import * as PageActions from './Page';
import * as PreviewActions from './Preview';
import * as MiscActions from './Misc';
import _ from 'lodash';

const allActions = _.assign({},
  ASideActions,
  BuilderActions,
  LocalizationActions,
  DialogActions,
  PageActions,
  PreviewActions,
  MiscActions
);

export default allActions;
