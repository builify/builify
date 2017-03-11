import React from 'react';
import { isNull as _isNull } from 'lodash';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';

export default function Color ({
  color,
  colorTarget,
  onClick,
  text
}) {
  const colorHolderStyle = {
    backgroundColor: color
  };
  const colorName = _isNull(text) ? localization(`design.colors.${colorTarget}`) : text;
  let colorElement = null;
  const onColorClick = () => {
    return onClick(colorElement);
  };

  return (
    <button
      ref={(ref) => { colorElement = ref; }}
      data-abcolor={color}
      data-colortarget={colorTarget}
      className={classNames('color')}
      onClick={onColorClick}>
      <div className={classNames('color__name')} title={colorName}>
        <span>{ colorName }</span>
      </div>
      <div
        className={classNames('color__circle')}
        title={color}
        data-color={color}
        style={colorHolderStyle} />
    </button>
  );
}

Color.propTypes = {
  text: React.PropTypes.string,
  color: React.PropTypes.string.isRequired,
  colorTarget: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired
};

Color.defaultProps = {
  text: null,
  colorTarget: ''
};
