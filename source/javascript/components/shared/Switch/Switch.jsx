import React from 'react';
import classNames from 'classnames';
import Thumb from './Thumb';

export default class Switch extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
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
          className='input'
          ref='input'
          type='checkbox' />
        <span role='switch' className={switchClassName}>
          <Thumb disabled={this.props.disabled} />
        </span>
        { this.props.label && <span>{this.props.label}</span> }
      </label>
    );
  }
}
