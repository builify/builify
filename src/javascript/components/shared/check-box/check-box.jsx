import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../../common/classnames';
import Ripple from '../ripple';

export default class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.any,
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

  shouldComponentUpdate (nextProps) {
    return (nextProps.checked !== this.props.checked);
  }

  handleClick (event) {
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(event);
    }
  }

  handleInputClick (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleMouseDown (event) {
    if (!this.props.disabled) {
      this.refs.ripple.start(event);
    }
  }

  render () {
    const fieldClassName = classNames('checkbox', {
      disabled: this.props.disabled
    }, this.props.className);
    const checkboxClassName = classNames('checkbox__check', {
      checked: this.props.checked
    });

    return (
      <label className={fieldClassName} onClick={::this.handleClick}>
        <input
          ref="input"
          {...this.props}
          className={classNames('checkbox__input')}
          onClick={::this.handleInputClick}
          type="checkbox" />
        <span data-role='checkbox' className={checkboxClassName} onMouseDown={::this.handleMouseDown}>
          <Ripple ref='ripple' data-role='ripple' className={classNames('checkbox__ripple')} spread={3} centered />
        </span>
        { this.props.label && <span data-role='label' className={classNames('checkbox__text')}>{ this.props.label }</span> }
      </label>
    );
  }

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }
}
