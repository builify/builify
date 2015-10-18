import React, { Component } from 'react';
import { connect } from 'react-redux';
import { randomKey } from '../../Common/Common';
import classNames from 'classnames';
import LoadingIcon from '../Shared/LoadingIcon.jsx';
import Icon from '../Shared/Icon.jsx';

class NotificationItem extends Component {
  closeItem (e) {
    console.log(e);
    return false;
  }

  render () {
    const notificationClassName = classNames('ab-notification__item');

    return (
      <div
        className={notificationClassName}>
        <div
          onClick={::this.closeItem}
          className='ab-notification__close'>
          <Icon name='close'/>
        </div>
        <div className='ab-notification__item-inner'>
          <div className='left'>
            <LoadingIcon size='small'/>
          </div>
          <div className='right'>
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    )
  }
}

class NotificationContainer extends Component {
  render () {
    const { notifications } = this.props;
    const notificationContainerClassName = classNames('ab-notification__container', 'bottom-right');

    return (
      <div
        className={notificationContainerClassName}>
        {notifications.map((notification) => {
          const notificationKey = '' + randomKey() + 'notification';

          return (
            <NotificationItem
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
