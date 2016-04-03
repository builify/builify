import React from 'react';
import ClassNames from 'classnames';
import Icon from '../Icon';

export default class Input extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.node,
    floating: React.PropTypes.bool,
    hint: React.PropTypes.string,
    icon: React.PropTypes.any,
    label: React.PropTypes.string,
    maxLength: React.PropTypes.number,
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
    hint: '',
    disabled: false,
    floating: true,
    multiline: false,
    required: false,
    type: 'text'
  };

  handleChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.value, event);
    }
  };

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  render () {
    const { children, disabled, error, floating, hint, icon,
            label: labelText, maxLength, multiline, required,
            type, value, ...others
    } = this.props;
    const length = maxLength && value ? value.length : 0;
    const labelClassName = ClassNames('tt-input__label', {
      'fixed': !floating
    });

    const className = ClassNames('tt-input', {
      'tt-input--disabled': disabled,
      'tt-input--error': error,
      'tt-input--hidden': type === 'hidden',
      'tt-input--withIcon': icon
    }, this.props.className);

    const valuePresent = value !== null && value !== undefined && value !== '' && !Number.isNaN(value);

    const InputElement = React.createElement(multiline ? 'textarea' : 'input', {
      ...others,
      className: ClassNames('tt-input__input', {
        'filled': valuePresent
      }),
      onChange: this.handleChange,
      ref: 'input',
      role: 'input',
      disabled,
      required,
      type,
      value,
      maxLength
    });

    return (
      <div className={className}>
        {InputElement}
        {icon ? <Icon className='tt-input__icon' icon={icon} /> : null}
        <span className='bar'></span>
        {labelText ?
          <label className={labelClassName}>
            {labelText}
            {required ? <span className='required'> * </span> : null}
          </label> : null}
        {hint ? <span className='tt-input__hint'>{hint}</span> : null}
        {error ? <span className='tt-input--error'>{error}</span> : null}
        {maxLength ? <span className='tt-input--counter'>{length}/{maxLength}</span> : null}
        {children}
      </div>
    );
  }
}
