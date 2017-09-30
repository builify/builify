import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../common/classnames';
import Icon from '../shared/icon';

export default function PreviewControlsItem ({
  name,
  active,
  hidden,
  onClick
}) {
  const iconSize = 20;
  const className = classNames(null, {
      active,
      hidden
  });
  const style = {
    fill: '#444'
  };
  const clickFunction = () => {
    return !hidden && onClick(name);
  };
  let title = '';

  switch (name) {
    case 'desktop':
      title = 'Set to Desktop View';
      break;

    case 'tablet':
      title = 'Set to Tablet View';
      break;

    case 'phone':
      title = 'Set to Phone View';
      break;

    case 'settings-applications':
      title = 'Set to Editor Mode';
      break;

    default:
      break;
  }

  return (
    <li className={className} title={title} onClick={clickFunction}>
      <Icon icon={name} style={style} size={iconSize} />
    </li>
  );
}

PreviewControlsItem.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  hidden: PropTypes.bool,
  onClick: PropTypes.func
};

PreviewControlsItem.defaultProps = {
  active: false,
  hidden: false,
  onClick: () => {}
};
