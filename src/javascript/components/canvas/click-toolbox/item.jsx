import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../../common/classnames';
import Icon from '../../shared/icon';

export default function ClickToolBoxItem ({
  icon,
  text,
  onClick
}) {
  return (
    <div className={classNames('crightpanel__item')} onClick={onClick}>
      { icon && <Icon icon={icon} /> }
      <span>{ text}</span>
    </div>
  );
}

ClickToolBoxItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func
};

ClickToolBoxItem.defaultProps = {
  icon: null,
  text: '',
  onClick: () => {}
};
