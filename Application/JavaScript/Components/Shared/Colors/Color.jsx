import React from 'react';
import ReactDOM from 'react-dom';
import { getString } from '../../../Common/Localization';

export default class Color extends React.Component {
  static propTypes = {
    color: React.PropTypes.string.isRequired,
    colorTarget: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  clickColor () {
    const node = ReactDOM.findDOMNode(this.refs['color']);

    return this.props.onClick(node);
  }

  render () {
    const { color, colorTarget } = this.props;
    const colorHolderStyle = {
      backgroundColor: color
    };
    const colorName = getString(`design.colors.${colorTarget}`);

    return (
      <div
        ref='color'
        className='ab-color'
        onClick={::this.clickColor}>
        <div
          className='ab-color__name'
          title={colorName}>
          <span>{colorName}</span>
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
