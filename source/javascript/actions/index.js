import * as asideActions from './aside';
import * as builderActions from './builder';
import * as dialogActions from './modal';
import * as pageActions from './page';
import * as previewActions from './preview';
import * as canvasActions from './canvas';
import * as notificationActions from './notifications';
import * as assetsActions from './assets';
import {
  assign as _assign
} from 'lodash';

const allActions = _assign({},
  builderActions,
  asideActions,
  dialogActions,
  pageActions,
  previewActions,
  canvasActions,
  notificationActions,
  assetsActions
);

export default allActions;
