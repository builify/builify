import React from 'react';
import Icon from '../../shared/icon';
import { emtpyFunction } from '../../../common/misc';

export default function ToolboxItem ({
  title,
  onClick,
  icon
}) {
  const iconSize = 24;
  const iconStyle = {
    fill: '#FFF'
  };

  return (
    <li onClick={onClick} title={title}>
      { icon && <Icon icon={icon} size={iconSize} style={iconStyle} /> }
    </li>
  );
}

ToolboxItem.propTypes = {
  title: React.PropTypes.string,
  onClick: React.PropTypes.func,
  icon: React.PropTypes.string
};

ToolboxItem.defaultProps = {
  title: '',
  onClick: emtpyFunction,
  icon: null
};
