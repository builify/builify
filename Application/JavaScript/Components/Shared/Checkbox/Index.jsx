import React from 'react';
import Events from '../../../Common/Events';
import Ripple from '../Ripple';

class Checkbox extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.any,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func
  };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };

  handleClick (event) {
    Events.pauseEvent(event);

    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(event);
    }
  }

  handleInputClick (event) {
    Events.pauseEvent(event);
  }

  handleMouseDown (event) {
    if (!this.props.disabled) {
      this.refs.ripple.start(event);
    }
  }

  render () {
    let fieldClassName = 'ab-checkbox';
    let checkboxClassName = 'ab-checkbox__check';
    if (this.props.checked) checkboxClassName += ' checked';
    if (this.props.disabled) fieldClassName += ' disabled';
    if (this.props.className) fieldClassName += ` ${this.props.className}`;

    return (
      <label
        className={fieldClassName}
        onClick={::this.handleClick}>
        <input
          ref='input'
          {...this.props}
          className='ab-checkbox__input'
          onClick={::this.handleInputClick}
          type='checkbox' />
        <span data-role='checkbox' className={checkboxClassName} onMouseDown={::this.handleMouseDown}>
          <Ripple ref='ripple' data-role='ripple' className='ab-checkbox__ripple' spread={3} centered />
        </span>
        { this.props.label ? <span data-role='label' className='ab-checkbox__text'>{this.props.label}</span> : null }
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

export default Checkbox;
