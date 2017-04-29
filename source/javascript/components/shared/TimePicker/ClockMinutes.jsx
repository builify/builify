import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import Face from './ClockFace';
import Hand from './ClockHand';

const minutes = range(0, 60, 5);
const step = 360 / 60;

export default class Minutes extends React.Component {
  static propTypes = {
    center: PropTypes.object,
    onChange: PropTypes.func,
    radius: PropTypes.number,
    selected: PropTypes.number,
    spacing: PropTypes.number
  };

  static defaultProps = {
    selected: 0,
    onChange: null
  };

  handleHandMove (degrees) {
    this.props.onChange(degrees / step);
  }

  handleMouseDown (event) {
    this.refs.hand.mouseStart(event);
  }

  handleTouchStart (event) {
    this.refs.hand.touchStart(event);
  }

  render () {
    return (
      <div>
        <Face
          onTouchStart={::this.handleTouchStart}
          onMouseDown={::this.handleMouseDown}
          numbers={minutes}
          spacing={this.props.spacing}
          radius={this.props.radius}
          twoDigits
          active={this.props.selected} />
        <Hand ref='hand'
          className={minutes.indexOf(this.props.selected) === -1 ? 'small' : ''}
          angle={this.props.selected * step}
          length={this.props.radius - this.props.spacing}
          onMove={::this.handleHandMove}
          origin={this.props.center}
          step={step} />
      </div>
    );
  }
}
