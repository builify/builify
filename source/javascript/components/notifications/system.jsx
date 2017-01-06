import React from 'react';
import _map from 'lodash/map';
import _values from 'lodash/values';
import _filter from 'lodash/filter';
import _isEqual from 'lodash/isequal';
import classNames from '../../common/classnames';
import NotificationContainer from './container';
import Constants from './constants';
import { removeNotification } from '../../actions';
import { connect } from 'react-redux';

class NotificationSystem extends React.Component {
  static propTypes = {
    style: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object
    ]),
    notifications: React.PropTypes.array,
    noAnimation: React.PropTypes.bool,
    allowHTML: React.PropTypes.bool,
    removeNotification: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    style: {},
    noAnimation: false,
    allowHTML: false
  };

  uid = Constants.defaultUid;

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
    removeNotification: function (id) {
      dispatch(removeNotification(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSystem);
