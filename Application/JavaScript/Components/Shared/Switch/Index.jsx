import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Events from '../../../Common/Events';
import Ripple from '../Ripple';

class Switch extends Component {
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

  state = {
    checked: this.props.checked
  };

  handleChange = (event) => {
    this.setState({checked: !this.state.checked}, () => {
      if (this.props.onChange) this.props.onChange(event, this);
    });
  };

  handleClick = (event) => {
    Events.pauseEvent(event);
    if (!this.props.disabled) this.handleChange(event);
  };

  handleInputClick = (event) => {
    Events.pauseEvent(event);
  };

  handleMouseDown = (event) => {
    if (!this.props.disabled) this.refs.ripple.start(event);
  };

  render () {
    const labelClassName = cx('ab-switch',
      this.props.disabled ? 'disabled' : 'field',
      this.props.className ? this.props.className : null);
    const switchClassName = this.state.checked ? 'switch-on' : 'switch-off';

    return (
      <label
        className={labelClassName}
        onClick={this.handleClick} >
        <input
          {...this.props}
          ref='input'
          checked={this.state.checked}
          className='input'
          onChange={this.handleChange}
          onClick={this.handleInputClick}
          type='checkbox' />
        <span role='switch' className={switchClassName}>
          <span role='thumb' className='thumb' onMouseDown={this.handleMouseDown}>
            <Ripple ref='ripple' role='ripple' className='ripple' spread={2.4} centered />
          </span>
        </span>
        { this.props.label ? <span className='text'>{this.props.label}</span> : null }
      </label>
    );
  }

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  getValue () {
    return this.state.checked;
  }

  setValue (value) {
    this.setState({checked: value});
  }
}

export default Switch;
