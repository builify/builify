import React from 'react';
import PropTypes from 'prop-types';
import Events from '../../../common/events';
import prefixer from '../../../common/prefix';

function angleFromPositions (cx, cy, ex, ey) {
  const theta = Math.atan2(ey - cy, ex - cx) + Math.PI / 2;
  return theta * 180 / Math.PI;
}

function angle360FromPositions (cx, cy, ex, ey) {
  const angle = angleFromPositions(cx, cy, ex, ey);
  return angle < 0 ? 360 + angle : angle;
}

export default class Hand extends React.Component {
  static propTypes = {
    angle: PropTypes.number,
    className: PropTypes.string,
    length: PropTypes.number,
    onMove: PropTypes.func,
    onMoved: PropTypes.func,
    origin: PropTypes.object,
    step: PropTypes.number
  };

  static defaultProps = {
    className: '',
    angle: 0,
    length: 0,
    origin: {}
  };

  state = {
    knobWidth: 0
  };

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        knobWidth: this.refs.knob.offsetWidth
      });
    });
  }

  componentWillUnmount () {
    Events.removeEventsFromDocument(this.getMouseEventMap());
    Events.removeEventsFromDocument(this.getTouchEventMap());
  }

  getMouseEventMap () {
    return {
      mousemove: this.handleMouseMove,
      mouseup: this.handleMouseUp
    };
  }

  getTouchEventMap () {
    return {
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd
    };
  }

  handleMouseMove = (event) => {
    this.move(Events.getMousePosition(event));
  };

  handleTouchMove = (event) => {
    this.move(Events.getTouchPosition(event));
  };

  handleMouseUp = () => {
    this.end(this.getMouseEventMap());
  };

  handleTouchEnd = () => {
    this.end(this.getTouchEventMap());
  };

  mouseStart (event) {
    Events.addEventsToDocument(this.getMouseEventMap());
    this.move(Events.getMousePosition(event));
  }

  touchStart (event) {
    Events.addEventsToDocument(this.getTouchEventMap());
    this.move(Events.getTouchPosition(event));
    Events.pauseEvent(event);
  }

  getPositionRadius (position) {
    const x = this.props.origin.x - position.x;
    const y = this.props.origin.y - position.y;
    return Math.sqrt(x * x + y * y);
  }

  trimAngleToValue (angle) {
    return this.props.step * Math.round(angle / this.props.step);
  }

  positionToAngle (position) {
    return angle360FromPositions(this.props.origin.x, this.props.origin.y, position.x, position.y);
  }

  end (evts) {
    if (this.props.onMoved) {
      this.props.onMoved();
    }

    Events.removeEventsFromDocument(evts);
  }

  move (position) {
    const degrees = this.trimAngleToValue(this.positionToAngle(position));
    const radius = this.getPositionRadius(position);

    if (this.props.onMove) {
      this.props.onMove(degrees === 360 ? 0 : degrees, radius);
    }
  }

  render () {
    const className = `tt-clock__hand ${this.props.className}`;
    const handStyle = prefixer({
      height: this.props.length - this.state.knobWidth / 2,
      transform: `rotate(${this.props.angle}deg)`
    });

    return (
      <div
        className={className}
        style={handStyle}>
        <div
          ref='knob'
          className='tt-clock__knob' />
      </div>
    );
  }
}
