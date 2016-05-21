import Actions from './constants';

export function addNotification (notification) {
  return {
    type: Actions.ADD_NOTIFICATION,
    notification: notification
  };
}

export function removeNotification (uid) {
  return {
    type: Actions.REMOVE_NOTIFICATION,
    uid: uid
  };
}
