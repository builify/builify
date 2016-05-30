import React from 'react';
import Ripple from '../ripple';
import Icon from '../icon';
import classNames from '../../../common/classnames';

export default class Button extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string,
    kind: React.PropTypes.string,
    label: React.PropTypes.string,
    loading: React.PropTypes.bool,
    mini: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    ripple: React.PropTypes.bool,
    type: React.PropTypes.string,
    onMouseDown: React.PropTypes.func
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

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };

  render () {
    const {
      label,
      icon,
      loading,
      ripple,
      primary,
      accent,
      kind,
      ...others
    } = this.props;
    const className = classNames('button', {
      'primary': primary,
      'accent': accent,
      'primary': (!primary && !accent), // eslint-disable-line
    }, kind, this.props.className);

    return (
      <button
        {...others}
        className={className}
        onMouseDown={this.handleMouseDown}
        disabled={this.props.disabled || this.props.loading} >
        { icon && <Icon className={classNames('button__icon')} name={icon} /> }
        { ripple && <Ripple ref='ripple' loading={loading} /> }
        { label && <abbr className={classNames('button__label')}>{label}</abbr> }
      </button>
    );
  }
}
