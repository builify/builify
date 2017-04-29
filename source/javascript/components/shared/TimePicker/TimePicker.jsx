import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Clock from './Clock';

function toggleTimeMode (d) {
  const newDate = d.clone();
  const hours = newDate.hours();

  newDate.hours(hours - (hours > 12 ? -12 : 12));
  return newDate;
}

export default class TimePicker extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    format: PropTypes.oneOf(['24hr', 'ampm']),
    onDismiss: PropTypes.func,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    time: PropTypes.object.isRequired
  };

  static defaultProps = {
    active: false,
    format: '24hr'
  };

  state = {
    display: 'hours',
    displayTime: this.props.time
  };

  componentWillUpdate (nextProps) {
    if (!this.props.active && nextProps.active) {
      setTimeout(this.refs.clock.handleCalculateShape, 1000);
    }
  }

  handleClockChange = (value) => {
    this.setState({
      displayTime: value
    });

    return this.props.onChange(value);
  };

  handleSelect = (event) => {
    this.props.onSelect(this.state.displayTime, event);
  };

  toggleTimeMode = () => {
    this.setState({
      displayTime: toggleTimeMode(this.state.displayTime)
    });
  };

  handleHandMoved = () => {
    if (this.state.display === 'hours') {
      this.setState({
        display: 'minutes'
      });
    }
  };

  switchDisplay = (display) => {
    this.setState({
      display
    });
  };

  renderAMPMLabels () {
    if (this.props.format === 'ampm') {
      return (
        <div className='tt-timepicker__ampm'>
          <span className='tt-timepicker__am' onClick={this.toggleTimeMode}>AM</span>
          <span className='tt-timepicker__pm' onClick={this.toggleTimeMode}>PM</span>
        </div>
      );
    }
  }

  render () {
    const { display, displayTime } = this.state;
    const hourClassName = classNames('tt-timepicker__time', {
      'is-active': display === 'hours'
    });
    const minuteClassName = classNames('tt-timepicker__time', {
      'is-active': display === 'minutes'
    });
    const hourText = displayTime.format('HH');
    const minuteText = displayTime.format('mm');

    return (
      <div className={this.props.className}>
        <header className='tt-timepicker__header'>
          <span
            className={hourClassName}
            onClick={this.switchDisplay.bind(this, 'hours')}>
            {hourText}
          </span>
          <span className='tt-timepicker__separator'>:</span>
          <span
            className={minuteClassName}
            onClick={this.switchDisplay.bind(this, 'minutes')}>
            { minuteText }
          </span>
          { this.renderAMPMLabels() }
        </header>
        <Clock
          ref='clock'
          display={this.state.display}
          format={this.props.format}
          onChange={this.handleClockChange}
          onHandMoved={this.handleHandMoved}
          time={displayTime} />
      </div>
    );
  }
}
