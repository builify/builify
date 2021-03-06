import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Thumb from './thumb';

export default class Switch extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func
  };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };

  handleToggle = (event) => {
    if (event.pageX !== 0 && event.pageY !== 0) {
      this.blur();
    }

    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(!this.props.checked, event);
    }
  };

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  render () {
    const className = classNames('ab-switch', this.props.disabled ? 'disabled' : 'field');
    const switchClassName = this.props.checked ? 'switch-on' : 'switch-off';
    const { ...others } = this.props;

    return (
      <label className={className}>
        <input
          {...others}
          checked={this.props.checked}
          onClick={this.handleToggle}
          readOnly
          className="input"
          ref="input"
          type="checkbox" />
        <span role="switch" className={switchClassName}>
          <Thumb disabled={this.props.disabled} />
        </span>
        { this.props.label && <span>{this.props.label}</span> }
      </label>
    );
  }
}
