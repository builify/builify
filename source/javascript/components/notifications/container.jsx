import React from 'react';
import NotificationItem from './item';
import Constants from './constants';

export default class NotificationContainer extends React.Component {
  static propTypes = {
    position: React.PropTypes.string.isRequired,
    notifications: React.PropTypes.array.isRequired
  };

  render () {
    if ([Constants.positions.bl, Constants.positions.br, Constants.positions.bc].indexOf(this.props.position) > -1) {
      this.props.notifications.reverse();
    }

    const notifications = this.props.notifications.map((notification) => {
      return (
        <NotificationItem
          ref={`notification-${notification.uid}`}
          key={notification.uid}
          notification={notification}
          onRemove={this.props.onRemove}
          noAnimation={this.props.noAnimation}
          allowHTML={this.props.allowHTML} />
      );
    });

    return (
      <div className={`ab-notification-${this.props.position}`}>
        { notifications }
      </div>
    );
  }
}
