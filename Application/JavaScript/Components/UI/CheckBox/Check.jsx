import React from 'react';
import classNames from 'classnames';
import Ripple from '../RippleEffect';
import style from './style';

const Check = ({ checked, children, onMouseDown }) => {
  const className = classNames(style.check, {
    [style.checked]: checked
  });

  return (
    <div
      data-role='checkbox'
      onMouseDown={onMouseDown}
      className={className}>
      {children}
    </div>
  );
};

export default Ripple({
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Check);
