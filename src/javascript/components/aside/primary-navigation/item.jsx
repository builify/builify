import React from 'react';
import PropTypes from 'prop-types';
import localization from '../../../common/localization';
import classNames from '../../../common/classnames';
import Icon from '../../shared/icon';
import { emptyFunction } from '../../../common/misc';

export default function NavigationItem ({
  title,
  icon,
  className,
  disabled,
  onClick,
  ...others
}) {
  const cn = classNames(null, {
    hide: disabled
  }, className);
  const text = localization(title);
  const clickEvent = (e) => {
    e.preventDefault();
    return onClick();
  };

  return (
    <li
      className={cn}
      title={text}
      onClick={clickEvent}
      {...others}>
      { icon && <Icon icon={icon} /> }
      { text && <span>{ text }</span> }
    </li>
  );
}

NavigationItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

NavigationItem.defaultProps = {
  className: '',
  disabled: false,
  onClick: emptyFunction
};
