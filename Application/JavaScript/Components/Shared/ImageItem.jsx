import React, { Component, PropTypes } from 'react';
import AssetsManager from '../../Common/AssetsManager';
import cx from 'classnames';
import ImageSpinner from './ImageSpinner';

class ImageItem extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    loaded: PropTypes.bool
  }

  static defaultProps = {
    alt: '',
    loaded: false
  }

  state = {
    isImageFileLoaded: this.props.loaded
  }

  imageDrag (e) {
    e.preventDefault();
  }

  loadedImage (e) {
    const { src } = this.props;

    AssetsManager.addAsset(src);

    this.setState({
      isImageFileLoaded: true
    });
  }

  render () {
    const { isImageFileLoaded } = this.state;
    const { src, alt } = this.props;
    const loadImage = cx('ab-loadimage', this.state.isImageFileLoaded ? 'loaded' : '');
    const imageSource = src;

    return (
      <div
        className={loadImage}
        ref='imageWrapper'>
        <ImageSpinner size={50} />
        <img
          draggable='false'
          onLoad={::this.loadedImage}
          src={imageSource}
          alt={alt ? alt : 'Picture'}
          ref='image'/>
      </div>
    )
  }
}

export default ImageItem;
