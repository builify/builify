import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notification extends Component {
  render () {
    const { type, message } = this.props.data;

    return (
      <h2>{message}</h2>
    )
  } 
}

class Notifications extends Component {
  render () {
    const { notifications } = this.props;

    return (
      <div className='ab-notifications'>
        {notifications.map((notification, i) => {
          return (
            <Notification 
              data={notification}
              key={i} />
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
)(Notifications);