import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import NotificationContainer from './NotificationContainer';
import Constants from './Constants';
import { removeNotification } from '../../Actions';

class NotificationSystem extends React.Component {
  static propTypes = {
    style: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object
    ]),
    noAnimation: React.PropTypes.bool,
    allowHTML: React.PropTypes.bool
  };

  static defaultProps = {
    style: {},
    noAnimation: false,
    allowHTML: false
  };

  state = {
    notifications: []
  };

  uid = Constants.defaultUid;

  render () {
    const { notifications } = this.props;
    var containers = null;

    if (notifications.length) {
      containers = _.map(_.values(Constants.positions), (position) => {
        const _notifications = _.filter(notifications, (notification) => {
          return position === notification.position;
        });

        if (_notifications.length) {
          return (
            <NotificationContainer
              ref={`container-${position}`}
              key={position}
              position={position}
              notifications={_notifications}
              onRemove={this.props.onRemoveNotification}
              noAnimation={this.props.noAnimation}
              allowHTML={this.props.allowHTML} />
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

function mapStateToProps (state) {
  return {
    notifications: state.notifications
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onRemoveNotification: (uid) => {
      dispatch(removeNotification(uid));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSystem);
