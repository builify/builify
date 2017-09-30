import React from 'react';
import PropTypes from 'prop-types';
import Ripple from '../ripple';
import Icon from '../icon';
import classNames from '../../../common/classnames';

export default class Button extends React.Component {
  static propTypes = {
    accent: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    kind: PropTypes.string,
    label: PropTypes.string,
    loading: PropTypes.bool,
    primary: PropTypes.bool,
    ripple: PropTypes.bool,
    type: PropTypes.string,
    onMouseDown: PropTypes.func,
    href: PropTypes.string,
    children: PropTypes.any
  };

  static defaultProps = {
    accent: false,
    className: '',
    kind: 'flat',
    loading: false,
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
      href,
      children,
      ...others
    } = this.props;
    const className = classNames('button', {
      'primary': primary,
      'accent': accent,
      'primary': (!primary && !accent), // eslint-disable-line
    }, kind, this.props.className);

    const element = href ? 'a' : 'button';

    const props = {
      ...others,
      href,
      ref: 'button',
      className: className,
      onMouseDown: this.handleMouseDown
    };

    return React.createElement(element, props,
      icon && <Icon className={classNames('button__icon')} name={icon} />,
      ripple && <Ripple ref='ripple' loading={loading} />,
      label && <abbr className={classNames('button__label')}>{label}</abbr>,
      children
    );
  }
}
