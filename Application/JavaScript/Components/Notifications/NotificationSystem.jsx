import React from 'react';
import _ from 'lodash';
import NotificationContainer from './NotificationContainer';
import Constants from './Constants';

class NotificationSystem extends React.Component {
  static propTypes = {
    noAnimation: React.PropTypes.bool,
    allowHTML: React.PropTypes.bool
  };

  static defaultProps = {
    noAnimation: false,
    allowHTML: false
  };

  state = {
    notifications: []
  };

  _didNotificationRemoved (uid) {
    var notification;
    var notifications = this.state.notifications.filter(function(toCheck) {
      if (toCheck.uid === uid) {
        notification = toCheck;
      }
      return toCheck.uid !== uid;
    });

    if (notification && notification.onRemove) {
      notification.onRemove(notification);
    }

    this.setState({ notifications: notifications });
  }

  addNotification (notification) {
    var _notification = _.assign({}, Constants.notification, notification);
    var notifications = this.state.notifications;
    var i;

    if (!_notification.level) {
      throw new Error('notification level is required.');
    }

    if (Object.keys(Constants.levels).indexOf(_notification.level) === -1) {
      throw new Error('\'' + _notification.level + '\' is not a valid level.');
    }

    if (isNaN(_notification.autoDismiss)) {
      throw new Error('\'autoDismiss\' must be a number.');
    }

    if (Object.keys(Constants.positions).indexOf(_notification.position) === -1) {
      throw new Error('\'' + _notification.position + '\' is not a valid position.');
    }

    // Some preparations
    _notification.position = _notification.position.toLowerCase();
    _notification.level = _notification.level.toLowerCase();
    _notification.autoDismiss = parseInt(_notification.autoDismiss, 10);

    _notification.uid = _notification.uid || this.uid;
    _notification.ref = 'notification-' + _notification.uid;
    this.uid += 1;

    // do not add if the notification already exists based on supplied uid
    for (i = 0; i < notifications.length; i++) {
      if (notifications[i].uid === _notification.uid) {
        return false;
      }
    }

    notifications.push(_notification);

    if (typeof _notification.onAdd === 'function') {
      notification.onAdd(_notification);
    }

    this.setState({
      notifications: notifications
    });

    return _notification;
  }

  removeNotification (notification) {
    var self = this;
    Object.keys(this.refs).forEach(function(container) {
      if (container.indexOf('container') > -1) {
        Object.keys(self.refs[container].refs).forEach(function(_notification) {
          var uid = notification.uid ? notification.uid : notification;
          if (_notification === 'notification-' + uid) {
            self.refs[container].refs[_notification]._hideNotification();
          }
        });
      }
    });
  }

  render () {
    const { allowHTML, noAnimation } = this.props;
    const { notifications } = this.state;
    var containers = null;

    if (notifications.length) {
      containers = Object.keys(Constants.positions).map((position) => {
        const _notifications = notifications.filter((notification) => {
          return position === notification.position;
        });

        if (_notifications.length) {
          return (
            <NotificationContainer
              ref={`container-${position}`}
              key={position}
              position={position}
              notifications={_notifications}
              onRemove={this._didNotificationRemoved}
              noAnimation={noAnimation}
              allowHTML={allowHTML} />
          );
        }
      });
    }

    return (
      <div className='ab-notification-wrapper'>
        { containers }
      </div>
    );
  }
}

export default NotificationSystem;
