import React from 'react';
import classNames from '../../../common/classnames';
import Icon from '../../shared/icon';

export default function ClickToolBoxItem({
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
  icon: React.PropTypes.string,
  text: React.PropTypes.string,
  onClick: React.PropTypes.func
};

ClickToolBoxItem.defaultProps = {
  icon: null,
  text: '',
  onClick: function () {}
};
