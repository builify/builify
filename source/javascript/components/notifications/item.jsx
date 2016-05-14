import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Constants from './constants';
import Timer from '../../modules/tt-timer';
import Icon from '../shared/icon';

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
    onRemove: function() {},
    allowHTML: false
  };

  state = {
    visible: false,
    removed: false
  };

  _notificationTimer = new Timer();
  _height = 0;
  _noAnimation = null;
  _isMounted = false;
  _removeCount = 0;

  componentWillMount () {
    this._noAnimation = this.props.noAnimation;
  }

  _getCssPropertyByPosition () {
    const { notification } = this.props;
    const { position } = notification;
    let css = {};

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

  _defaultAction (event) {
    const { notification } = this.props;

    event.preventDefault();
    this._hideNotification();

    if (typeof notification.action.callback === 'function') {
      notification.action.callback();
    }
  }

  _hideNotification () {
    if (this._notificationTimer) {
      this._notificationTimer.stop();
    }

    if (this._isMounted) {
      this.setState({
        visible: false,
        removed: true
      });
    }

    if (this._noAnimation) {
      this._removeNotification();
    }
  }

  _removeNotification () {
    this.props.onRemove(this.props.notification.uid);
  }

  _dismiss () {
    if (!this.props.notification.dismissible) {
      return;
    }

    this._hideNotification();
  }

  _showNotification () {
    setTimeout(() => {
      if (this._isMounted) {
        this.setState({
          visible: true
        });
      }
    }, 50);
  }

  _onTransitionEnd () {
    if (this._removeCount > 0) {
      return;
    }

    if (this.state.removed) {
      this._removeCount++;
      this._removeNotification();
    }
  }

  componentDidMount () {
    var transitionEvent = whichTransitionEvent();
    var notification = this.props.notification;
    var element = ReactDOM.findDOMNode(this);

    this._height = element.offsetHeight;

    this._isMounted = true;

    // Watch for transition end
    if (!this._noAnimation) {
      if (transitionEvent) {
        element.addEventListener(transitionEvent, ::this._onTransitionEnd);
      } else {
        this._noAnimation = true;
      }
    }

    if (notification.autoDismiss) {
      this._notificationTimer.start(notification.autoDismiss);

      this._notificationTimer.on('onend', () => {
        this._hideNotification();
      });
    }

    this._showNotification();
  }

  _handleMouseEnter () {
    var notification = this.props.notification;
    if (notification.autoDismiss) {
      this._notificationTimer.pause();
    }
  }

  _handleMouseLeave () {
    var notification = this.props.notification;
    if (notification.autoDismiss) {
      this._notificationTimer.start();
    }
  }

  componentWillUnmount () {
    const element = ReactDOM.findDOMNode(this);
    const transitionEvent = whichTransitionEvent();

    element.removeEventListener(transitionEvent, ::this._onTransitionEnd);

    this._isMounted = false;
  }

  _allowHTML (string) {
    return { __html: string };
  }

  render () {
    var notification = this.props.notification;
    var notificationStyle = {};
    var cssByPos = this._getCssPropertyByPosition();
    var dismiss = null;
    var title = null;
    var message = null;
    const iconOptions = {
      size: 16
    };

    const className = classNames('ab-notification-item',
    `ab-notification-item-${notification.level}`,
    this.state.visible ? 'ab-notification-item-visible' : 'ab-notification-item-hidden');

    if (!this.state.visible && !this.state.removed) {
      notificationStyle[cssByPos.property] = cssByPos.value;
    }

    if (this.state.visible && !this.state.removed) {
      notificationStyle.height = this._height;
      notificationStyle[cssByPos.property] = 0;
    }

    if (this.state.removed) {
      notificationStyle.overlay = 'hidden';
      notificationStyle.height = 0;
      notificationStyle.marginTop = 0;
      notificationStyle.paddingTop = 0;
      notificationStyle.paddingBottom = 0;
    }

    notificationStyle.opacity = this.state.visible ? 1 : 0;

    if (notification.title) {
      title = <h4 className='ab-notification-item-title'>{ notification.title }</h4>;
    }

    if (notification.message) {
      if (this.props.allowHTML) {
        message = (
          <div className='ab-notification-item-message' dangerouslySetInnerHTML={this._allowHTML(notification.message)}></div>
        );
      } else {
        message = (
          <div className='ab-notification-item-message'>{notification.message}</div>
        );
      }
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
        onClick={::this._dismiss}
        onMouseEnter={::this._handleMouseEnter}
        onMouseLeave={::this._handleMouseLeave}
        style={notificationStyle}>
        { title }
        { message }
        { dismiss }
      </div>
    );
  }
}
