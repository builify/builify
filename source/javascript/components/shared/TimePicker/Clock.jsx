import React from 'react';
import PropTypes from 'prop-types';
import Hours from './ClockHours';
import Minutes from './ClockMinutes';

export default class Clock extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    display: PropTypes.oneOf(['hours', 'minutes']),
    format: PropTypes.oneOf(['24hr', 'ampm']),
    onChange: PropTypes.func,
    onHandMoved: PropTypes.func,
    time: PropTypes.object.isRequired
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
    window.addEventListener('resize', ::this.handleCalculateShape);
    setTimeout(() => {
      this.handleCalculateShape();
    });
  }

  componentWillUnmount () {
    window.removeEventListener('resize', ::this.handleCalculateShape);
  }

  handleHourChange (hours) {
    if (this.props.time.hour() !== hours) {
      this.props.onChange(
        this.props.time.hour(hours)
      );
    }
  }

  handleMinuteChange (minutes) {
    if (this.props.time.minutes() !== minutes) {
      this.props.onChange(
        this.props.time.minutes(minutes)
      );
    }
  }

  handleCalculateShape () {
    const placeholderElement = this.refs.placeholder;
    const placeHolderElementRect = placeholderElement.getBoundingClientRect();
    const { top, left, width } = placeHolderElementRect;

    this.setState({
      center: {
        x: left + width / 2,
        y: top + width / 2
      },
      radius: width / 2
    });
  }

  renderHours () {
    return (
      <Hours
        center={this.state.center}
        format={this.props.format}
        onChange={::this.handleHourChange}
        radius={this.state.radius}
        selected={this.props.time.hour()}
        spacing={this.state.radius * 0.18}
        onHandMoved={this.props.onHandMoved} />
    );
  }

  renderMinutes () {
    return (
      <Minutes
        center={this.state.center}
        onChange={::this.handleMinuteChange}
        radius={this.state.radius}
        selected={this.props.time.minute()}
        spacing={this.state.radius * 0.18}
        onHandMoved={this.props.onHandMoved} />
    );
  }

  render () {
    const size = {
      height: this.state.radius * 2
    };

    return (
      <div className='tt-clock'>
        <div
          ref='placeholder'
          className='tt-clock__placeholder'
          style={size}>
          <div
            key={this.props.display}
            className='tt-clock__wrapper'
            style={size}>
            { this.props.display === 'hours' ? this.renderHours() : null }
            { this.props.display === 'minutes' ? this.renderMinutes() : null }
          </div>
        </div>
      </div>
    );
  }
}
