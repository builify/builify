import React from 'react';
import PropTypes from 'prop-types';
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
    position: PropTypes.string.isRequired,
    notifications: PropTypes.array.isRequired,
    onRemove: PropTypes.func,
    noAnimation: PropTypes.bool,
    allowHTML: PropTypes.bool
  };

  static defaultProps = {
    onRemove: emtpyFunction,
    noAnimation: false,
    allowHTML: false
  };

  shouldComponentUpdate (nextProps) {
    return (!_isEqual(nextProps.notifications, this.props.notifications));
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
