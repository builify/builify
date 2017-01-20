import React from 'react';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import {
  isNull as _isNull
} from 'lodash';

export default class Color extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    colorTarget: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    text: null,
    colorTarget: ''
  };

  colorElement = null;

  shouldComponentUpdate () {
    return false;
  }

  clickColor () {
    return this.props.onClick(this.colorElement);
  }

  render () {
    const { color, colorTarget, text } = this.props;
    const colorHolderStyle = {
      backgroundColor: color
    };
    const colorName = _isNull(text) ? localization(`design.colors.${colorTarget}`) : text;

    return (
      <div
        ref={(ref) => this.colorElement = ref}
        data-abcolor={color}
        data-colortarget={colorTarget}
        className={classNames('color')}
        onClick={::this.clickColor}>
        <div className={classNames('color__name')} title={colorName}>
          <span>{ colorName }</span>
        </div>
        <div
          className={classNames('color__circle')}
          title={color}
          data-color={color}
          style={colorHolderStyle} />
      </div>
    );
  }
}
