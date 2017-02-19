import React from 'react';
import classNames from '../../../common/classnames';

function Image ({
  src,
  height,
  width,
  chalk,
  backgroundImage,
  onClick,
  className
}) {
  if (backgroundImage) {
    const imgStyle = {
      backgroundImage: `url("${src}")`
    };
    const cn = classNames('image', className);
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
        <div className={classNames('image__bg')} style={imgStyle} />
      </div>
    );
  } else {
    const cn = classNames('image', {
      'chalk': chalk
    });

    return (
      <div className={className}>
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

Image.propTypes = {
  src: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  backgroundImage: React.PropTypes.bool,
  chalk: React.PropTypes.bool,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  sizeInfo: React.PropTypes.object,
  onClick: React.PropTypes.func
};

Image.defaultProps = {
  className: null,
  backgroundImage: false,
  chalk: false,
  height: null,
  width: null,
  sizeInfo: null,
  onClick: function () {}
};

export default Image;
