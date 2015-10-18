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
      const { id } = action;
      let index = -1;

      for (let i = 0; i < state.length; i++) {
        const currentItem = state[i];

        if (currentItem.id === id) {
          index = i;
          break;
        }
      }

      if (index !== -1) {
        return [
          ...state.slice(0, index)
        ]
      }
      
      return state;
  }

  return state;
}
