import React from 'react';
import {
  map as _map,
  isEqual as _isEqual
} from 'lodash';
import NotificationItem from './item';
import Constants from './constants';
import classNames from '../../common/classnames';
import { emtpyFunction } from '../../common/misc';

export default class NotificationContainer extends React.Component {
  static propTypes = {
    position: React.PropTypes.string.isRequired,
    notifications: React.PropTypes.array.isRequired,
    onRemove: React.PropTypes.func,
    noAnimation: React.PropTypes.bool,
    allowHTML: React.PropTypes.bool
  };

  static defaultProps = {
    onRemove: emtpyFunction,
    noAnimation: false,
    allowHTML: false
  };

  shouldComponentUpdate (nextProps) {
    if (!_isEqual(nextProps.notifications, this.props.notifications)) {
      return true;
    }

    return false;
  }

  render () {
    if ([Constants.positions.bl, Constants.positions.br, Constants.positions.bc].indexOf(this.props.position) > -1) {
      this.props.notifications.reverse();
    }

    const notifications = _map(this.props.notifications, (notification) => {
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

    const className = classNames(`notification-${this.props.position}`);

    return (
      <div className={className}>
        { notifications }
      </div>
    );
  }
}
