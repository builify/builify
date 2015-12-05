import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

export default class ImageItem extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    backgroundImage: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
    onClick: PropTypes.func
  };

  static defaultProps = {
    className: null,
    backgroundImage: false,
    height: null,
    width: null,
    onClick: () => {}
  };

  renderImage () {
    const { src, height, width, backgroundImage, onClick, className } = this.props;

    if (backgroundImage) {
      const imgStyle = {
        backgroundImage: `url("${src}")`
      };
      const cn = cx('ab-image', className);
      const style = {
        height: height,
        width: width
      };

      return (
        <div
          onClick={(e) => {
            return onClick(e);
          }}
          className={cn}
          style={style}>
          <div
            className={'ab-image__bg'}
            style={imgStyle} />
        </div>
      )
    } else {
      return (
        <div
          onClick={(e) => {
            return onClick(e);
          }}
          className='ab-image'>
          <img
            src={src} />
        </div>
      )
    }
  }

  render () {
    return this.renderImage();
  }
}
