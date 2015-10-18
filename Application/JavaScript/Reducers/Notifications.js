import * as Actions from '../Constants/Actions';

const notificationsInitialState = [];
const notificationDefaultProps = {
  type: null,
  message: null,
  timeout: null
};

export function notifications (state = notificationsInitialState, action) {
  switch (action.type) {
    case Actions.ADD_NOTIFICATION:
      const { notification } = action;
      const notificaionItem = Object.assign(notificationDefaultProps, notification);

      return [...state, notificaionItem];

    case Actions.REMOVE_NOTIFICATION:
      return state;
  }

  return state;
}
