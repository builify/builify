import React from 'react';
import { connect } from 'react-redux';
import {
  map as _map,
  values as _values,
  filter as _filter
} from 'lodash';
import classNames from '../../common/classnames';
import NotificationContainer from './container';
import Constants from './constants';
import { removeNotification } from '../../actions';

class NotificationSystem extends React.Component {
  static propTypes = {
    notifications: React.PropTypes.array.isRequired,
    noAnimation: React.PropTypes.bool,
    allowHTML: React.PropTypes.bool,
    removeNotification: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    noAnimation: false,
    allowHTML: false
  };

  render () {
    const { notifications } = this.props;
    let containers = null;

    if (notifications.length) {
      containers = _map(_values(Constants.positions), (position) => {
        const _notifications = _filter(notifications, (notification) => {
          return position === notification.position;
        });

        if (_notifications.length) {
          return (
            <NotificationContainer
              ref={`container-${position}`}
              key={position}
              position={position}
              notifications={_notifications}
              onRemove={this.props.removeNotification}
              noAnimation={this.props.noAnimation}
              allowHTML={this.props.allowHTML} />
          );
        }
      });
    }

    return (
      <div className={classNames('notification-wrapper')}>
        { containers }
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { notifications } = state;

  return {
    notifications
  };
}

function mapDispatchToProps (dispatch) {
  return {
    removeNotification: (id) => {
      dispatch(removeNotification(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSystem);
