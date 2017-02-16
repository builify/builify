import React from 'react';
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
  style
}) {
  const cn = classNames(null, {
    'hide': disabled
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
      style={style}>
      { icon && <Icon icon={icon} /> }
      { text && <span>{ text }</span> }
    </li>
  );
}

NavigationItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  style: React.PropTypes.object
};

NavigationItem.defaultProps = {
  currentLocation: -1,
  className: '',
  disabled: false,
  onClick: emptyFunction,
  style: {}
};
