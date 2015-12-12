import React from 'react';
import Ripple from './Ripple';

const Check = ({children, onMouseDown}) => (
  <span role='thumb' className={style.thumb} onMouseDown={onMouseDown}>{children}</span>
);

export default Ripple({
  className: style.ripple,
  spread: 2.6,
  centered: true
})(Check);
