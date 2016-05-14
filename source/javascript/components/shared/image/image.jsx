import React from 'react';
import classNames from 'classnames';
import isNull from 'lodash/isnull';

export default class ImageItem extends React.Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    backgroundImage: React.PropTypes.bool,
    chalk: React.PropTypes.bool,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    sizeInfo: React.PropTypes.object,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    className: null,
    backgroundImage: false,
    chalk: false,
    height: null,
    width: null,
    sizeInfo: null,
    onClick: function () {}
  };

  renderTextInfo () {
    const { sizeInfo } = this.props;
    const { width, height } = sizeInfo;

    if (isNull(sizeInfo) || width <= 0 || height <= 0) {
      return null;
    }

    return (
      <div
        className='ab-modal__imgholder-info'
        title='Does not reflect original image size but image size that appears in the element.'>
        <span>{`${width}x${height}`}</span>
      </div>
    );
  }

  renderImage () {
    const {
      src,
      height,
      width,
      chalk,
      backgroundImage,
      onClick,
      className
    } = this.props;

    if (backgroundImage) {
      const imgStyle = {
        backgroundImage: `url("${src}")`
      };
      const cn = classNames('ab-image', className);
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
          <div className='ab-image__bg' style={imgStyle} />
        </div>
      );
    } else {
      const userCn = classNames(className);
      const cn = classNames('ab-image', chalk ? 'chalk' : null);

      return (
        <div className={userCn}>
          <div
            onClick={(e) => {
              return onClick(e);
            }}
            className={cn}>
            <img src={src} />
          </div>
        </div>
      );
    }
  }

  render () {
    return this.renderImage();
  }
}
