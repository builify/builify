import React from 'react';
import classNames from 'classnames';
import Clock from './Clock';

const emptyFunction = () => {};

export default class TimePicker extends React.Component {
  static propTypes = {
    time: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    onChange: emptyFunction
  };

  state = {
    display: 'hours',
    displayTime: this.props.time
  };

  changeDisplayToHours () {
    this.setState({
      ...this.state,
      display: 'hours'
    });
  }

  changeDisplayToMinutes () {
    this.setState({
      ...this.state,
      display: 'minutes'
    });
  }

  render () {
    const { display } = this.state;
    const { time, onChange } = this.props;
    const hourClassName = classNames('time', {
      'is-active': display === 'hours'
    });
    const minuteClassName = classNames('time', {
      'is-active': display === 'minutes'
    });

    return (
      <div>
        <div className='ab-time__showtime'>
          <span className={hourClassName} onClick={::this.changeDisplayToHours}>{time.format('HH')}</span>
          <span className='separator'>:</span>
          <span className={minuteClassName} onClick={::this.changeDisplayToMinutes}>{time.format('mm')}</span>
        </div>
        <Clock
          display={this.state.display}
          onChange={onChange}
          onHandMoved={emptyFunction}
          time={this.props.time} />
      </div>
    );
  }
}
