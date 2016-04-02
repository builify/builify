import React from 'react';
import classNames from 'classnames';
import Calendar from './Calendar';
import Time from './Time';

export default class TimeInput extends React.Component {
  static propTypes = {
    time: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func
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

  render () {
    const { onChange } = this.props;
    const { tab } = this.state;
    const dateButtonClassName = classNames({
      'is-active': tab === 0
    });
    const timeButtonClassName = classNames({
      'is-active': tab === 1
    });
    const calendarClassName = classNames('ab-timeinput__tab', {
      'is-active': tab === 0
    });
    const timeClassName = classNames('ab-timeinput__tab', {
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
          <Calendar
            className={calendarClassName}
            onChange={onChange}
            time={this.props.time} />
          <Time
            className={timeClassName}
            onChange={onChange}
            time={this.props.time} />
        </div>
      </div>
    );
  }
}
