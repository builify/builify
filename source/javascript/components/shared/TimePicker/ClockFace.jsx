import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Face extends React.Component {
  static propTypes = {
    active: PropTypes.number,
    numbers: PropTypes.array,
    radius: PropTypes.number,
    spacing: PropTypes.number,
    twoDigits: PropTypes.bool
  };

  static defaultProps = {
    active: null,
    numbers: [],
    radius: 0,
    twoDigits: false
  };

  numberStyle (rad, num) {
    return {
      position: 'absolute',
      left: (rad + rad * Math.sin(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing),
      top:  (rad - rad * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing)
    };
  }

  faceStyle () {
    const size = this.props.radius * 2;

    return {
      height: size,
      width: size
    };
  }

  renderNumber (number, idx) {
    const className = classNames('tt-clock__number', {
      'is-active': number === this.props.active
    });

    return (
      <span
        className={className}
        style={this.numberStyle(this.props.radius - this.props.spacing, idx + 1)}
        key={number}>
        {this.props.twoDigits ? ('0' + number).slice(-2) : number}
      </span>
    );
  }

  render () {
    return (
      <div
        ref='root'
        className='tt-clock__face'
        onTouchStart={this.props.onTouchStart}
        onMouseDown={this.props.onMouseDown}
        style={this.faceStyle()}>
        {this.props.numbers.map(::this.renderNumber)}
      </div>
    );
  }
}
