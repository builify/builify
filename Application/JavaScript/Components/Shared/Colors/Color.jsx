import React from 'react';
import { getString } from '../../../Common/Localization';

export default class Color extends React.Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
    colorTarget: React.PropTypes.string.isRequired,
    clickFunction: React.PropTypes.func.isRequired
  };

  clickColor (e) {
    const { clickFunction } = this.props;

    return clickFunction(this.refs['color']);
  }

  render () {
    const { color, colorTarget } = this.props;
    const colorHolderStyle = {
      backgroundColor: color
    };
    const colorName = getString('design.colors.' + colorTarget);

    return (
      <div
        ref='color'
        className='ab-color'
        onClick={::this.clickColor}>
        <div
          className='ab-color__name'
          title={colorName}>
          {colorName}
        </div>
        <div
          className='ab-color__circle'
          title={color}>
          <span
            data-colortarget={colorTarget}
            data-color={color}
            className='ab-color__colorHolder'
            style={colorHolderStyle} />
        </div>
      </div>
    );
  }
}
