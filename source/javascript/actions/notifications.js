import Actions from './Constants';

export function addNotification (notification) {
  return (dispatch) => {
    dispatch({
      type: Actions.ADD_NOTIFICATION,
      notification: notification
    });
  };
}

export function removeNotification (uid) {
  return {
    type: Actions.REMOVE_NOTIFICATION,
    uid: uid
  };
}
