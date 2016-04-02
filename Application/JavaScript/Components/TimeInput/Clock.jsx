import React from 'react';
import ClockHours from './ClockHours';
import ClockMinutes from './ClockMinutes';

export default class Clock extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    display: React.PropTypes.oneOf(['hours', 'minutes']),
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    onChange: React.PropTypes.func,
    onHandMoved: React.PropTypes.func,
    time: React.PropTypes.object
  };

  static defaultProps = {
    className: '',
    display: 'hours',
    format: '24hr'
  };

  state = {
    center: {
      x: null,
      y: null
    },
    radius: 0
  };

  componentDidMount () {
    window.addEventListener('resize', this.handleCalculateShape);
    setTimeout(() => {
      this.handleCalculateShape();
    });
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleCalculateShape);
  }

  handleHourChange = (hours) => {
    const { time } = this.props;

    if (time.hour() !== hours) {
      this.props.onChange(time.hour(hours));
    }
  };

  handleMinuteChange = (minutes) => {
    const { time } = this.props;

    if (time.minute() !== minutes) {
      this.props.onChange(time.minute(minutes));
    }
  };

  handleCalculateShape = () => {
    const { top, left } = this.refs.placeholder.getBoundingClientRect();
    const width = 250;

    this.setState({
      center: {
        x: left + width / 2,
        y: top + width / 2
      },
      radius: width / 2
    });
  };

  renderHours () {
    const { center, radius } = this.state;
    const { time } = this.props;
    const spacing = radius * 0.18;

    return (
      <ClockHours
        center={center}
        format={this.props.format}
        onChange={this.handleHourChange}
        radius={radius}
        selected={time.hour()}
        spacing={spacing}
        onHandMoved={this.props.onHandMoved} />
    );
  }

  renderMinutes () {
    return null;
    return (
      <ClockMinutes
        center={this.state.center}
        onChange={this.handleMinuteChange}
        radius={this.state.radius}
        selected={this.props.time.hour()}
        spacing={this.state.radius * 0.18}
        onHandMoved={this.props.onHandMoved} />
    );
  }

  render () {
    const { display } = this.props;
    const { radius } = this.state;
    const size = radius * 2;
    const style = {
      height: size,
      width: size
    };

    return (
      <div className='ab-clock'>
        <div
          ref='placeholder'
          className='ab-clock__placeholder'
          style={style}>
          <div
            className='ab-clock__wrapper'
            style={style}>
            { display === 'hours' ? this.renderHours() : this.renderMinutes() }
          </div>
       </div>
     </div>
   );
  }
}
