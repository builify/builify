import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';

export default class Input extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.node,
    floating: PropTypes.bool,
    hint: PropTypes.string,
    icon: PropTypes.any,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    multiline: PropTypes.bool,
    showLength: PropTypes.bool,
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
    hint: '',
    disabled: false,
    floating: true,
    multiline: false,
    required: false,
    type: 'text'
  };

  shouldComponentUpdate (nextProps) {
    return (this.props.onChange !== nextProps.onChange);
  }

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
    const {
      children, disabled, error, floating, hint, icon,
      label: labelText, maxLength, multiline, required,
      type, value, showLength,
      ...others
    } = this.props;
    const labelClassName = classNames('tt-input__label', {
      'fixed': !floating
    });

    const className = classNames('tt-input', {
      'tt-input--disabled': disabled,
      'tt-input--error': error,
      'tt-input--hidden': type === 'hidden',
      'tt-input--withIcon': icon
    }, this.props.className);

    const valuePresent = value !== null && value !== undefined && value !== '' && !Number.isNaN(value);

    const InputElement = React.createElement(multiline ? 'textarea' : 'input', {
      ...others,
      className: classNames('tt-input__input', {
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

    let length = 0;

    if (showLength) {
      length = `${value ? value.length : 0}`;
    } else if (maxLength) {
      length = value ? value.length : 0;
    }

    return (
      <div className={className}>
        { InputElement }
        { icon && <Icon className='tt-input__icon' icon={icon} /> }
        <span className='bar'></span>
        { labelText &&
          <label className={labelClassName}>
            { labelText }
            { required && <span className='required'> * </span> }
          </label> }
        { hint && <span className='tt-input__hint'>{ hint }</span> }
        { error && <span className='tt-input--error'>{ error }</span> }
        { maxLength && <span className='tt-input--counter'>{ length }/{ maxLength }</span> }
        { showLength && <span className='tt-input--counter'>{ length }</span> }
        { children }
      </div>
    );
  }
}
