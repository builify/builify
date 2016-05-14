import React from 'react';
import capitalize from 'lodash/capitalize';
import round from 'lodash/round';
import classNames from 'classnames';

const maxmin = (pos, min, max) => (pos < min) ? min : (( pos > max ) ? max : pos);

const Constants = {
  orientation: {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      coordinate: 'x',
    },
    vertical: {
      dimension: 'height',
      direction: 'top',
      coordinate: 'y',
    }
  }
};

export default class Slider extends React.Component {
  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    value: React.PropTypes.number,
    orientation: React.PropTypes.string,
    onChange: React.PropTypes.func,
    className: React.PropTypes.string,
  };

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    orientation: 'horizontal',
  };

  state = {
    limit: 0,
    grab: 0,
  };

  componentDidMount () {
    const { orientation } = this.props;
    const dimension = capitalize(Constants.orientation[orientation].dimension);
    const query = `offset${dimension}`;
    const sliderPos = this.refs.slider[query];
    const handlePos = this.refs.handle[query];

    this.setState({
      limit: sliderPos - handlePos,
      grab: handlePos / 2,
    });
  }

  handleSliderMouseDown (e) {
    const { onChange } = this.props;

    if (!onChange) {
      return;
    }

    return onChange(this.position(e));
  }

  handleKnobMouseDown () {
    window.addEventListener('mousemove', this.handleDrag);
    window.addEventListener('mouseup', this.handleDragEnd);
  }

  handleDrag = (e) => {
    const { onChange } = this.props;

    if (!onChange) {
      return;
    }

    return onChange(this.position(e));
  };

  handleDragEnd = () => {
    window.removeEventListener('mousemove', this.handleDrag);
    window.removeEventListener('mouseup', this.handleDragEnd);
  };

  handleNoop (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  getPositionFromValue (value) {
    const { limit } = this.state;
    const { min, max } = this.props;
    const percentage = (value - min) / (max - min);
    const position = Math.round(percentage * limit);

    return position;
  }

  getValueFromPosition (pos) {
    let percentage, value;
    let { limit } = this.state;
    let { orientation, min, max, step } = this.props;
    percentage = (maxmin(pos, 0, limit) / (limit || 1));

    if (orientation === 'horizontal') {
      value = step * Math.round(percentage * (max - min) / step) + min;
    } else {
      value = max - (step * Math.round(percentage * (max - min) / step) + min);
    }

    return step < 1 ? round(value, 2) : value;
  }

  position (e) {
    const { grab } = this.state;
    const { orientation } = this.props;
    const node = this.refs.slider;
    const coordinateStyle = Constants.orientation[orientation].coordinate;
    const directionStyle = Constants.orientation[orientation].direction;
    const coordinate = e['client' + capitalize(coordinateStyle)];
    const direction = node.getBoundingClientRect()[directionStyle];

    const pos = coordinate - direction - grab;
    const value = this.getValueFromPosition(pos);

    return value;
  }

  getCoordinates (position) {
    const { limit, grab } = this.state;
    const { orientation } = this.props;
    const value = this.getValueFromPosition(position);
    const handlePosition = this.getPositionFromValue(value);
    const fillPosition = (orientation === 'horizontal') ? (handlePosition + grab) : (limit - handlePosition + grab);

    return {
      fill: fillPosition,
      handle: handlePosition,
    };
  }

  render() {
    const { value, orientation } = this.props;
    const className = classNames('tt-sliderinput ', `tt-sliderinput--${orientation}`, this.props.className);
    const fillClassName = classNames('tt-sliderinput__fill');
    const handleClassName = classNames('tt-sliderinput__handle');

    const dimension = Constants.orientation[orientation].dimension;
    const direction = Constants.orientation[orientation].direction;

    const position = this.getPositionFromValue(value);
    const coords = this.getCoordinates(position);

    const fillStyle = {
      [dimension]: `${coords.fill}px`
    };
    const handleStyle = {
      [direction]: `${coords.handle}px`
    };

    return (
      <div
        ref='slider'
        className={className}
        onMouseDown={::this.handleSliderMouseDown}
        onClick={::this.handleNoop}>
        <div
          ref='fill'
          className={fillClassName}
          style={fillStyle} />
        <div
          ref='handle'
          className={handleClassName}
          onMouseDown={::this.handleKnobMouseDown}
          onClick={::this.handleNoop}
          style={handleStyle} />
      </div>
    );
  }
}
