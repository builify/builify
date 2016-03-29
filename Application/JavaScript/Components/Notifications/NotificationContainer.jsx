import React from 'react';
import Random from '../../Common/Random';
import Constants from './Constants';
import NotificationItem from './NotificationItem';

export default class NotificationContainer extends React.Component {
  static propTypes = {
    position: React.PropTypes.string.isRequired,
    notifications: React.PropTypes.array.isRequired
  };

  render () {
    var self = this;
    var notifications;

    if ([Constants.positions.bl, Constants.positions.br, Constants.positions.bc].indexOf(this.props.position) > -1) {
      this.props.notifications.reverse();
    }

    notifications = this.props.notifications.map(function(notification) {
      return (
        <NotificationItem
          ref={ 'notification-' + notification.uid }
          key={Random.randomString(notification.uid)}
          notification={ notification }
          getStyles={ self.props.getStyles }
          onRemove={ self.props.onRemove }
          noAnimation={ self.props.noAnimation }
          allowHTML={ self.props.allowHTML }
        />
      );
    });

    return (
      <div className={ 'ab-notification-' + this.props.position } style={ this._style }>
        { notifications }
      </div>
    );
  }
}
