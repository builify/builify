import React, { Component, PropTypes } from 'react';
import Ripple from '../Ripple';
import Icon from '../Icon';
import classNames from '../../../common/classnames';

class Button extends Component {
  static propTypes = {
    accent: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    kind: PropTypes.string,
    label: PropTypes.string,
    loading: PropTypes.bool,
    mini: PropTypes.bool,
    primary: PropTypes.bool,
    ripple: PropTypes.bool,
    type: PropTypes.string
  };

  static defaultProps = {
    accent: false,
    className: '',
    kind: 'flat',
    loading: false,
    mini: false,
    primary: false,
    ripple: true
  };

  handleMouseDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.refs.ripple.start(event);
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  render () {
    const {
      label,
      icon,
      loading,
      ripple,
      primary,
      accent,
      mini,
      kind,
      ...others
    } = this.props;
    const className = classNames('button', {
      'primary': primary,
      'accent': accent,
      'primary': (!primary && !accent),
    }, kind, this.props.className);

    return (
      <button
        {...others}
        className={className}
        onMouseDown={this.handleMouseDown}
        disabled={this.props.disabled || this.props.loading} >
        { icon ? <Icon className={classNames('button__icon')} name={icon} /> : null }
        { ripple ? <Ripple ref='ripple' loading={loading} /> : null }
        { label ? <abbr className={classNames('button__label')}>{label}</abbr> : null }
      </button>
    );
  }
}

export default Button;
