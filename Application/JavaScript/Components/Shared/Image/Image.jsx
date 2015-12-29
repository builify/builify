import React from 'react';
import classNames from 'classnames';

export default class ImageItem extends React.Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    backgroundImage: React.PropTypes.bool,
    chalk: React.PropTypes.bool,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    className: null,
    backgroundImage: false,
    chalk: false,
    height: null,
    width: null,
    onClick: function () {}
  };

  renderImage () {
    const { src, height, width, chalk, backgroundImage, onClick, className } = this.props;

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
          <div
            className='ab-image__bg'
            style={imgStyle} />
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
