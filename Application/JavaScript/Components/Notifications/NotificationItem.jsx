import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../Shared/Icon';
import Timer from './Timer';
import Constants from './Constants';

var whichTransitionEvent = function() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
};

export default class NotificationItem extends React.Component {
  static propTypes = {
    notification: React.PropTypes.object,
    onRemove: React.PropTypes.func,
    allowHTML: React.PropTypes.bool,
    noAnimation: React.PropTypes.bool
  };

  static defaultProps = {
    noAnimation: false,
    allowHTML: false,
    onRemove: () => {}
  };

  state = {
    visible: false,
    removed: false
  };

  _notificationTimer = null;
  _removeCount = 0;

  componentDidMount () {
    const { notification, noAnimation } = this.props;
    const element = ReactDOM.findDOMNode(this);
    const transitionEvent = whichTransitionEvent();

    if (!noAnimation) {
      if (transitionEvent) {
        element.addEventListener(transitionEvent, ::this.onTransitionEnd);
      } else {
        this.props.noAnimation = true;
      }
    }

    if (notification.autoDismiss) {
      this._notificationTimer = new Timer();

      this._notificationTimer.start(notification.autoDismiss);

      this._notificationTimer.on('onend', () => {
        this.hideNotification();
      });
    }

    this.showNotification();
  }

  componentWillUnmount () {
    const element = ReactDOM.findDOMNode(this);
    const transitionEvent = whichTransitionEvent();
    element.removeEventListener(transitionEvent, ::this.onTransitionEnd);
  }

  getCssPropertyByPosition () {
    var position = this.props.notification.position;
    var css = {};

    switch (position) {
      case Constants.positions.tl:
      case Constants.positions.bl:
        css = {
          property: 'left',
          value: -200
        };
        break;

      case Constants.positions.tr:
      case Constants.positions.br:
        css = {
          property: 'right',
          value: -200
        };
        break;

      case Constants.positions.tc:
        css = {
          property: 'top',
          value: -100
        };
        break;

      case Constants.positions.bc:
        css = {
          property: 'bottom',
          value: -100
        };
        break;

      default:
    }

    return css;
  }

  onTransitionEnd () {
    if (this._removeCount > 0) {
      return;
    }

    if (this.state.removed) {
      this._removeCount++;
      this.removeNotification();
    }
  }

  removeNotification () {
    this.props.onRemove(this.props.notification.uid);
  }

  showNotification () {
    setTimeout(() => {
      this.setState({
        visible: true
      });
    }, 50);
  }

  hideNotification () {
    const { noAnimation } = this.props;

    if (this._notificationTimer) {
      this._notificationTimer.stop();
    }

    if (noAnimation) {
      this.removeNotification();
    }

    this.setState({
      visible: false,
      removed: true
    });
  }

  handleDismiss () {

  }

  handleMouseEnter () {
    const { notification } = this.props;

    if (notification.autoDismiss) {
      this._notificationTimer.pause();
    }
  }

  handleMouseLeave () {
    const { notification } = this.props;

    if (notification.autoDismiss) {
      this._notificationTimer.start();
    }
  }

  render () {
    const { notification } = this.props;
    const iconOptions = {
      size: 24
    };
    const className = classNames('ab-notification-item', 'ab-notification-item-error',
      this.state.visible ? 'ab-notification-item-visible' : 'ab-notification-item-hidden'
    );
    const styleByPosition = this.getCssPropertyByPosition();
    var notificationStyle = {};
    var title = null;
    var message = null;
    var dismiss = null;

    if (notification.title && _.isString(notification.title)) {
      title = <h4 className='ab-notification-item-title'>{notification.title}</h4>;
    }

    if (notification.message && _.isString(notification.message)) {
      message = <div className='ab-notification-item-message'>{notification.message}</div>;
    }

    if (notification.dismissible) {
      dismiss = (
        <div className='ab-notification-item-dismiss'>
          <Icon
            icon='clear'
            size={iconOptions.size} />
        </div>
      );
    }

    return (
      <div
        className={className}
        style={notificationStyle}
        onClick={::this.handleDismiss}
        onMouseEnter={::this.handleMouseEnter}
        onMouseLeave={::this.handleMouseLeave}>
        { title }
        { message }
        { dismiss }
      </div>
    );
  }
}
