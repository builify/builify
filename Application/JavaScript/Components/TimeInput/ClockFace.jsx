import React from 'react';
import classNames from 'classnames';

export default class Face extends React.Component {
  static propTypes = {
    active: React.PropTypes.number,
    numbers: React.PropTypes.array,
    radius: React.PropTypes.number,
    spacing: React.PropTypes.number,
    twoDigits: React.PropTypes.bool
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
      top: (rad - rad * Math.cos(360 * (Math.PI / 180) / 12 * (num - 1)) + this.props.spacing)
    };
  }

  faceStyle () {
    return {
      height: this.props.radius * 2,
      width: this.props.radius * 2
    };
  }

  renderNumber (number, idx) {
    const className = classNames('ab-clock__number', {
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
        className='ab-clock__face'
        onTouchStart={this.props.onTouchStart}
        onMouseDown={this.props.onMouseDown}
        style={this.faceStyle()} >
        {this.props.numbers.map(this.renderNumber.bind(this))}
      </div>
    );
  }
}
