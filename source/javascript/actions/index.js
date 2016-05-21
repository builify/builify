import _assign from 'lodash/assign';
import * as asideActions from './aSide';
import * as builderActions from './builder';
import * as dialogActions from './dialog';
import * as pageActions from './page';
import * as previewActions from './preview';
import * as canvasActions from './canvas';
import * as notificationActions from './notifications';

const allActions = _assign({},
  builderActions,
  asideActions,
  dialogActions,
  pageActions,
  previewActions,
  canvasActions,
  notificationActions
);

export default allActions;
