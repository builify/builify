import React from 'react';
import Face from './ClockFace';
import Hand from './ClockHand';

function range (start = 0, stop = null, step = 1) {
    let [_start, _stop] = [0, start];
    if (stop !== null) {
      [_start, _stop] = [start, stop];
    }
    const length = Math.max(Math.ceil((_stop - _start) / step), 0);
    const range = Array(length);

    for (let idx = 0; idx < length; idx++, _start += step) {
      range[idx] = _start;
    }

    return range;
}

const outerNumbers = [0, ...range(13, 24)];
const innerNumbers = [12, ...range(1, 12)];
const innerSpacing = 1.7;
const step = 360 / 12;

class Hours extends React.Component {
  static propTypes = {
    center: React.PropTypes.object,
    format: React.PropTypes.oneOf(['24hr', 'ampm']),
    onChange: React.PropTypes.func,
    onHandMoved: React.PropTypes.func,
    radius: React.PropTypes.number,
    selected: React.PropTypes.number,
    spacing: React.PropTypes.number
  };

  state = {
    inner: this.props.format === '24hr' && this.props.selected > 0 && this.props.selected <= 12
  };

  handleHandMove (degrees, radius) {
    const currentInner = radius < this.props.radius - this.props.spacing * innerSpacing;

    if (this.props.format === '24hr' && this.state.inner !== currentInner) {
      this.setState({
        inner: currentInner
      }, () => {
        this.props.onChange(this.valueFromDegrees(degrees));
      });
    } else {
      this.props.onChange(this.valueFromDegrees(degrees));
    }
  }

  handleMouseDown (event) {
    this.refs.hand.mouseStart(event);
  }

  valueFromDegrees (degrees) {
    if (this.props.format === 'ampm' || this.props.format === '24hr' && this.state.inner) {
      return innerNumbers[degrees / step];
    } else {
      return outerNumbers[degrees / step];
    }
  }

  renderInnerFace (innerRadius) {
    if (this.props.format === '24hr') {
      return (
        <Face
          onMouseDown={::this.handleMouseDown}
          numbers={innerNumbers}
          spacing={this.props.spacing}
          radius={innerRadius}
          active={this.props.selected} />
      );
    }
  }

  render () {
    const { format, selected, radius, spacing, center, onHandMoved } = this.props;
    const is24hr = format === '24hr';

    return (
      <div>
          <Face
            onMouseDown={::this.handleMouseDown}
            numbers={is24hr ? outerNumbers : innerNumbers}
            spacing={spacing}
            radius={radius}
            twoDigits={is24hr}
            active={is24hr ? selected : (selected % 12 || 12)} />
          { this.renderInnerFace(radius - spacing * innerSpacing) }
          <Hand ref='hand'
            angle={selected * step}
            length={(this.state.inner ? radius - spacing * innerSpacing : radius) - spacing}
            onMove={::this.handleHandMove}
            onMoved={onHandMoved}
            origin={center}
            step={step} />
      </div>
    );
  }
}

export default Hours;
