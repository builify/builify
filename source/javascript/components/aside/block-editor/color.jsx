/**
 * Created by Genert Org on 11/03/2017.
 */
import React from 'react';
import classNames from '../../../common/classnames';
import { emptyFunction } from '../../../common/misc';

export default class Color extends React.Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    onClick: emptyFunction
  };

  _colorElement = null;

  shouldComponentUpdate (nextProps) {
    return (nextProps.color !== this.props.color);
  }

  clickEvent (e) {
    e.preventDefault();
    return this.props.onClick(this._colorElement);
  }

  render () {
    const { color, title, type } = this.props;
    const colorHolderStyle = {
      backgroundColor: color
    };

    return (
      <div
        ref={(ref) => { this._colorElement = ref; }}
        title={title}
        data-abcolor={color}
        data-editorcolor={type}
        className={classNames(['color', 'be-block__colors__item'])}
        onClick={::this.clickEvent}>
        <div className={classNames(['color__name', 'be-block__colors__name'])}>
          <span>{ title }</span>
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
