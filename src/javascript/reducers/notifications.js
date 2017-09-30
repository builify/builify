import {
  assign as _assign,
  values as _values,
  isNaN as _isNaN,
  isFunction as _isFunction
} from 'lodash';
import Constants from '../components/notifications/constants';
import * as Actions from '../actions/constants';
import { MAXIMUM_NOTIFICATIONS } from '../constants';

const notificationsInitialState = [];
let UID = Constants.defaultUid;

export default function (state = notificationsInitialState, action) {
  switch (action.type) {
    case Actions.ADD_NOTIFICATION: {
      const { notification } = action;
      const notifications = state;
      const _notification = _assign({}, Constants.notification, notification);

      if (!_notification.level) {
        throw new Error('notification level is required.');
      }

      if (_values(Constants.levels).indexOf(_notification.level) === -1) {
        throw new Error(`"${_notification.level}" is not a valid level.`);
      }

      if (_isNaN(_notification.autoDismiss)) {
        throw new Error('"autoDismiss" is not a valid position.');
      }

      if (_values(Constants.positions).indexOf(_notification.position) === -1) {
        throw new Error(`"${_notification.position}" is not a valid position.`);
      }

      // Some preparations
      _notification.position = _notification.position.toLowerCase();
      _notification.level = _notification.level.toLowerCase();
      _notification.autoDismiss = parseInt(_notification.autoDismiss, 10);

      _notification.uid = _notification.uid || UID;
      _notification.ref = `notification-${_notification.uid}`;

      UID += 1;


      // do not add if the notification already exists based on supplied uid
      for (let i = 0; i < notifications.length; i += 1) {
        if (notifications[i].uid === _notification.uid) {
          return false;
        }
      }

      if (notifications.length > MAXIMUM_NOTIFICATIONS) {
        notifications.shift();
      }

      notifications.push(_notification);

      if (_isFunction(_notification.onAdd)) {
        notification.onAdd(_notification);
      }

      return [...notifications];
    }

    case Actions.REMOVE_NOTIFICATION: {
      const { uid } = action;
      let notification = null;

      const newlist = state.filter((toCheck) => {
        if (toCheck.uid === uid) {
          notification = toCheck;
        }

        return toCheck.uid !== uid;
      });

      if (notification && notification.onRemove) {
        notification.onRemove(notification);
      }

      return [...newlist];
    }

    default:
      return state;
  }
}
