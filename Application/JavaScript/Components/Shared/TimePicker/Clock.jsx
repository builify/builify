import React from 'react';
import Hours from './ClockHours';
import Minutes from './ClockMinutes';

function getTimeMode (d) {
  return d.getHours() >= 12 ? 'pm' : 'am';
}

function clone (d) {
  return new Date(d.getTime());
}

function setHours (d, hours) {
  const newDate = clone(d);
  newDate.setHours(hours);
  return newDate;
}

function setMinutes (d, minutes) {
  const newDate = clone(d);
  newDate.setMinutes(minutes);
  return newDate;
}

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
    format: '24hr',
    time: new Date()
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
    if (this.props.time.getHours() !== hours) {
      this.props.onChange(setHours(this.props.time, this.adaptHourToFormat(hours)));
    }
  }

  handleMinuteChange (minutes) {
    if (this.props.time.getMinutes() !== minutes) {
      this.props.onChange(setMinutes(this.props.time, minutes));
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

  adaptHourToFormat (hour) {
    if (this.props.format === 'ampm') {
      if (getTimeMode(this.props.time) === 'pm') {
        return hour < 12 ? hour + 12 : hour;
      } else {
        return hour === 12 ? 0 : hour;
      }
    } else {
      return hour;
    }
  }

  renderHours () {
    return (
      <Hours
        center={this.state.center}
        format={this.props.format}
        onChange={::this.handleHourChange}
        radius={this.state.radius}
        selected={this.props.time.getHours()}
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
        selected={this.props.time.getMinutes()}
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
