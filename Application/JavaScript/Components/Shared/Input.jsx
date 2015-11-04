import React, { Component, PropTypes } from 'react';

class Input extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    floating: PropTypes.bool,
    icon: PropTypes.string,
    label: PropTypes.string,
    multiline: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.any
  };

  static defaultProps = {
    className: '',
    disabled: false,
    floating: true,
    multiline: false,
    required: false,
    type: 'text'
  };

  state = {
    value: this.props.value
  };

  onChange = (event) => {
    this.setState({value: event.target.value}, () => {
      if (this.props.onChange) this.props.onChange(event, this);
    });
  };

  renderInput () {
    let className = 'ab-input__input';
    if (this.state.value && this.state.value.length > 0) className += ` filled`;

    if (this.props.multiline) {
      return (
        <textarea
          ref='input'
          role='input'
          {...this.props}
          className={className}
          onChange={this.onChange}
          value={this.state.value} />
      );
    } else {
      return (
        <input
          ref='input'
          role='input'
          {...this.props}
          className={className}
          value={this.state.value}
          onChange={this.onChange} />
      );
    }
  }

  render () {
    let className = 'ab-input';
    let labelClassName = 'ab-input__label';
    if (this.props.error) className += ' ab-input__error';
    if (this.props.disabled) className += ' ab-input__disabled';
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.type === 'hidden') className += ' hidden';
    if (this.props.icon) className += ' with-icon';
    if (!this.props.floating) labelClassName += ' fixed';

    return (
      <div className={className}>
        { this.renderInput() }
        <span className={'ab-input__bar'}></span>
        { this.props.label ? <label className={labelClassName}>{this.props.label}</label> : null }
        { this.props.error ? <span className={'ab-input__error'}>{this.props.error}</span> : null }
      </div>
    );
  }

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  getValue () {
    return this.state.value;
  }

  setValue (value) {
    this.setState({value});
  }
}

export default Input;
