import React, { Component } from 'react';
import { connect } from 'react-redux';
import { randomKey } from '../../Common/Common';
import { removeNotification } from '../../Actions/ActionCreators';
import classNames from 'classnames';
import LoadingIcon from '../Shared/LoadingIcon.jsx';
import Icon from '../Shared/Icon.jsx';

class NotificationWrapper extends Component {
  closeItem (e) {
    console.log(e);
    return false;
  }

  render () {
    const { children } = this.props;
    const cn = classNames('ab-notification__item');

    return (
      <div
        className={cn}>
        <div
          onClick={::this.closeItem}
          className='ab-notification__close'>
          <Icon name='close'/>
        </div>
        <div className='ab-notification__item-inner'>
          {children}
        </div>
      </div>
    )
  }
}

class NotificationItem extends Component {
  renderChildren () {
    const { data } = this.props;
    const { type, id } = data;

    if (type === 'loading') {
      return (
        <div>
          <div className='left'>
            <LoadingIcon size='small' />
          </div>
          <div className='right'>
            <h1>Loading...</h1>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <NotificationWrapper>
        {this.renderChildren()}
      </NotificationWrapper>
    )
  }
}

class NotificationContainer extends Component {
  render () {
    const { notifications } = this.props;
    const cn = classNames('ab-notification__container', 'top-right');

    return (
      <div
        className={cn}>
        {notifications.map((notification) => {
          const notificationKey = '' + randomKey() + 'notification';

          return (
            <NotificationItem
              data={notification}
              key={notificationKey}/>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    notifications: state.notifications
  }
}

export default connect(
  mapStateToProps
)(NotificationContainer);
