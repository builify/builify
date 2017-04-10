import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { assign as _assign } from 'lodash';
import renderIcon from './render-icon';
import { emptyFunction } from '../../../common/misc';

export default function Icon ({
  icon,
  onClick,
  size,
  style,
  className,
  ...others
}) {
  const cn = classNames(className);
  const styles = {
    fill: 'currentcolor',
    width: `${size}px`, // CSS instead of the width attr to support non-pixel units
    height: `${size}px` // Prevents scaling issue in IE
  };

  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      style={_assign({}, styles, style)}
      className={cn}
      {...others}>
      { renderIcon(icon) }
    </svg>
  );
}

Icon.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.object,
  className: PropTypes.string
};

Icon.defaultProps = {
  onClick: emptyFunction,
  size: 18,
  className: '',
  style: {}
};
