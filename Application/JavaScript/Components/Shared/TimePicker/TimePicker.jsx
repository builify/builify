import React from 'react';
import classNames from 'classnames';
import Clock from './Clock';

function toggleTimeMode (d) {
  const newDate = this.clone(d);
  const hours = newDate.getHours();

  newDate.setHours(hours - (hours > 12 ? -12 : 12));
  return newDate;
}

export default class TimePicker extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    onDismiss: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    value: React.PropTypes.object
  };

  static defaultProps = {
    active: false,
    format: '24hr',
    value: new Date()
  };

  state = {
    display: 'hours',
    displayTime: this.props.value
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

  formatHours () {
    if (this.props.format === 'ampm') {
      return this.state.displayTime.getHours() % 12 || 12;
    } else {
      return this.state.displayTime.getHours();
    }
  }

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
    const { display } = this.state;
    const hourClassName = classNames('tt-timepicker__time', {
      'is-active': display === 'hours'
    });
    const minuteClassName = classNames('tt-timepicker__time', {
      'is-active': display === 'minutes'
    });

    return (
      <div className={this.props.className}>
        <header className='tt-timepicker__header'>
          <span
            className={hourClassName}
            onClick={this.switchDisplay.bind(this, 'hours')}>
            {('0' + this.formatHours()).slice(-2)}
          </span>
          <span className='tt-timepicker__separator'>:</span>
          <span
            className={minuteClassName}
            onClick={this.switchDisplay.bind(this, 'minutes')}>
            {('0' + this.state.displayTime.getMinutes()).slice(-2)}
          </span>
          { this.renderAMPMLabels() }
        </header>
        <Clock
          ref='clock'
          display={this.state.display}
          format={this.props.format}
          onChange={this.handleClockChange}
          onHandMoved={this.handleHandMoved}
          time={this.state.displayTime} />
      </div>
    );
  }
}
