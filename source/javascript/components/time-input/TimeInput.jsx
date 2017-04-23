import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Calendar from './Calendar';
import Time from './Time';

export default class TimeInput extends React.Component {
  static propTypes = {
    time: PropTypes.object.isRequired,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  };

  state = {
    tab: 0
  };

  changeTab (tab) {
    this.setState({
      tab: tab
    });
  }

  renderCalendar () {
    const calendarClassName = classNames('ab-timeinput__tab', 'is-active');

    return (
      <Calendar
        className={calendarClassName}
        onChange={this.props.onChange}
        time={this.props.time} />
    );
  }

  renderTimePicker () {
    const timeClassName = classNames('ab-timeinput__tab', 'is-active');

    return (
      <Time
        className={timeClassName}
        onChange={this.props.onChange}
        time={this.props.time} />
    );
  }

  render () {
    const { tab } = this.state;
    const dateButtonClassName = classNames({
      'is-active': tab === 0
    });
    const timeButtonClassName = classNames({
      'is-active': tab === 1
    });

    return (
      <div className='ab-timeinput'>
        <div className='ab-timeinput__options'>
          <button
           type='button'
           className={dateButtonClassName}
           onClick={() => {
             this.changeTab(0);
           }}>
           <span>Date</span>
          </button>
          <button
           type='button'
           className={timeButtonClassName}
           onClick={() => {
             this.changeTab(1);
           }}>
           <span>Time</span>
          </button>
        </div>
        <div className='ab-timeinput__tabs'>
          { tab === 0 ? this.renderCalendar() : this.renderTimePicker() }
        </div>
      </div>
    );
  }
}
