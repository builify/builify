import _ from 'lodash';
import Constants from '../Components/Notifications/Constants';
import * as Actions from '../Actions/Constants';

const notificationsInitialState = [];
const notificationDefaultProps = Constants.notification;

var UID = Constants.defaultUid;

export default function notifications (state = notificationsInitialState, action) {
  switch (action.type) {
    case Actions.ADD_NOTIFICATION: {
      const { notification } = action;
      var notifications = state;
      const _notification = _.assign({}, Constants.notification, notification);

      if (!_notification.level) {
        throw new Error('notification level is required.');
      }

      if (_.values(Constants.levels).indexOf(_notification.level) === -1) {
        throw new Error(`"${_notification.level}" is not a valid level.`);
      }

      if (_.isNaN(_notification.autoDismiss)) {
        throw new Error(`"autoDismiss" is not a valid position.`);
      }

      if (_.values(Constants.positions).indexOf(_notification.position) === -1) {
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
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].uid === _notification.uid) {
          return false;
        }
      }

      notifications.push(_notification);

      if (_.isFunction(_notification.onAdd)) {
        notification.onAdd(_notification);
      }

      return [...notifications];
    }

    case Actions.REMOVE_NOTIFICATION: {
      var { uid } = action;
      var notification = null;

      var notifications = state.filter((toCheck) => {
        if (toCheck.uid === uid) {
          notification = toCheck;
        }

        return toCheck.uid !== uid;
      });

      if (notification && notification.onRemove) {
        notification.onRemove(notification);
      }

      return [...notifications];
    }
  }

  return state;
}
