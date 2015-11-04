import React, { Component, PropTypes } from 'react';
import events from '../../Common/Events';
import Ripple from './Ripple';

class Checkbox extends Component {
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

  state = {
    checked: this.props.checked
  };

  componentWillReceiveProps = (next_props) => {
    console.log('componentWillReceiveProps', next_props.checked);
    // this.setState({ checked: next_props.checked });
  };

  handleChange = (event) => {
    this.setState({checked: !this.state.checked}, () => {
      if (this.props.onChange) this.props.onChange(event, this);
    });
  };

  handleClick = (event) => {
    events.pauseEvent(event);
    if (!this.props.disabled) this.handleChange(event);
  };

  handleMouseDown = (event) => {
    if (!this.props.disabled) this.refs.ripple.start(event);
  };

  handleInputClick = (event) => {
    events.pauseEvent(event);
  };

  render () {
    let fieldClassName = 'ab-checkbox';
    let checkboxClassName = 'ab-checkbox__check';
    if (this.state.checked) checkboxClassName += ` checked`;
    if (this.props.disabled) fieldClassName += ` disabled`;
    if (this.props.className) fieldClassName += ` ${this.props.className}`;

    return (
      <label
        className={fieldClassName}
        onClick={this.handleClick} >
        <input
          {...this.props}
          ref='input'
          type='checkbox'
          className='ab-checkbox__input'
          checked={this.state.checked}
          onChange={this.handleChange}
          onClick={this.handleInputClick}
        />
        <span data-role='checkbox' className={checkboxClassName} onMouseDown={this.handleMouseDown}>
          <Ripple ref='ripple' data-role='ripple' className='ab-checkbox__ripple' spread={3} centered />
        </span>
        { this.props.label ? <span data-role='label' className={'ab-checkbox__text'}>{this.props.label}</span> : null }
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

export default Checkbox;
