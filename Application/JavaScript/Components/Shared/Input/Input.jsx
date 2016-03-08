import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

export default class Input extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    floating: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    multiline: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    required: React.PropTypes.bool,
    type: React.PropTypes.string,
    value: React.PropTypes.any
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
    this.setState({
      value: event.target.value
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(event, this);
      }
    });
  };

  renderInput () {
    const className = classNames('ab-input__input', {
      'filled': !!(this.state.value && this.state.value.length > 0)
    });

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
    const className = classNames('ab-input', {
      'ab-input__error': this.props.error,
      'ab-input__disabled': this.props.disabled,
      'hidden': !!(this.props.type === 'hidden'),
      'with-icon': this.props.icon,
    }, this.props.className);
    const labelClassName = classNames('ab-input__label', {
      'fixed': !this.props.floating
    });

    return (
      <div className={className}>
        { this.renderInput() }
        { this.props.icon ? <Icon className='ab-input__icon' icon={this.props.icon} /> : null }
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
    this.setState({
      value
    });
  }
}
