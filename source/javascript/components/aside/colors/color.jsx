import React from 'react';
import localization from '../../../common/localization';

export default class Color extends React.Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
    colorTarget: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  colorElement = null;

  shouldComponentUpdate () {
    return false;
  }

  clickColor () {
    return this.props.onClick(this.colorElement);
  }

  render () {
    const { color, colorTarget } = this.props;
    const colorHolderStyle = {
      backgroundColor: color
    };
    const colorName = localization(`design.colors.${colorTarget}`);

    return (
      <div
        ref={(ref) => this.colorElement = ref}
        data-abcolor={color}
        data-colortarget={colorTarget}
        className='ab-color'
        onClick={::this.clickColor}>
        <div className='ab-color__name' title={colorName}>
          <span>{colorName}</span>
        </div>
        <div
          className='ab-color__circle'
          title={color}
          data-color={color}
          style={colorHolderStyle}>
        </div>
      </div>
    );
  }
}
