import React from 'react';
import classNames from '../../../common/classnames';
import prefixer from '../../../common/prefix';

export default class ProgressBar extends React.Component {
  static propTypes = {
    buffer: React.PropTypes.number,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    mode: React.PropTypes.oneOf(['determinate', 'indeterminate']),
    multicolor: React.PropTypes.bool,
    type: React.PropTypes.oneOf(['linear', 'circular']),
    value: React.PropTypes.number
  };

  static defaultProps = {
    buffer: 0,
    className: '',
    disabled: false,
    max: 100,
    min: 0,
    mode: 'indeterminate',
    multicolor: false,
    type: 'linear',
    value: 0
  };

  shouldComponentUpdate (nextProps) {
    if (nextProps.value !== this.props.value) {
      return true;
    }

    return false;
  }

  calculateRatio (value) {
    if (value < this.props.min) {
      return 0;
    }

    if (value > this.props.max) {
      return 1;
    }

    return (value - this.props.min) / (this.props.max - this.props.min);
  }

  circularStyle () {
    if (this.props.mode !== 'indeterminate') {
      return {
        strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400`
      };
    }

    return {};
  }

  linearStyle () {
    if (this.props.mode !== 'indeterminate') {
      return {
        buffer: prefixer({transform: `scaleX(${this.calculateRatio(this.props.buffer)})`}),
        value: prefixer({transform: `scaleX(${this.calculateRatio(this.props.value)})`})
      };
    }

    return {};
  }

  renderCircular () {
    return (
      <svg className={classNames('progress-bar__circle')} viewBox="0 0 60 60">
        <circle className={classNames('progress-bar__path')} style={this.circularStyle()} cx='30' cy='30' r='25' />
      </svg>
    );
  }

  renderLinear () {
    const { buffer, value } = this.linearStyle();

    return (
      <div>
        <span ref='buffer' data-ref='buffer' className={classNames('progress-bar__buffer')} style={buffer} />
        <span ref='value' data-ref='value' className={classNames('progress-bar__value')} style={value} />
      </div>
    );
  }

  render () {
    const { className, disabled, max, min, mode, multicolor, type, value } = this.props;
    const _className = classNames({
      [`progress-bar__${type}`]: true
    }, {
      multicolor
    }, mode, className);

    return (
      <div
        disabled={disabled}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className={_className}>
        { type === 'circular' ? this.renderCircular() : this.renderLinear() }
      </div>
    );
  }
}
