import Actions from './constants';

export function addNotification(notification = {}) {
    return {
        type: Actions.ADD_NOTIFICATION,
        notification
    };
}

export function removeNotification(uid = 0) {
    return {
        type: Actions.REMOVE_NOTIFICATION,
        uid
    };
}

export function demoNotification() {
    return function(dispatch) {
        dispatch(addNotification({
            level: 'warning',
            title: 'Demo Version',
            message: 'Buy full version to get access'
        }));
    };
}
