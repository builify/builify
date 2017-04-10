import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../shared/icon';
import { emtpyFunction } from '../../../common/misc';

export default function ToolboxItem ({
  title,
  onClick,
  icon,
  itemRef
}) {
  const iconSize = 24;
  const iconStyle = {
    fill: '#FFF'
  };

  return (
    <li onClick={onClick} title={title} ref={itemRef}>
      { icon && <Icon icon={icon} size={iconSize} style={iconStyle} /> }
    </li>
  );
}

ToolboxItem.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  itemRef: PropTypes.func
};

ToolboxItem.defaultProps = {
  title: '',
  onClick: emtpyFunction,
  icon: null,
  itemRef: emtpyFunction
};
