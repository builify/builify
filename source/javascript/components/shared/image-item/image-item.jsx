import React from 'react';
import classNames from 'classnames';
import ImageSpinner from './loading-spinner';

export default class ImageItem extends React.Component {
  static propTypes = {
    src: React.PropTypes.string.isRequired,
    alt: React.PropTypes.string,
    loaded: React.PropTypes.bool
  };

  static defaultProps = {
    alt: '',
    loaded: false
  };

  state = {
    isImageFileLoaded: this.props.loaded
  };

  imageDrag (e) {
    e.preventDefault();
  }

  loadedImage () {
    this.setState({
      isImageFileLoaded: true
    });
  }

  render () {
    const { src, alt } = this.props;
    const loadImage = classNames('ab-loadimage', {
      'loaded': this.state.isImageFileLoaded
    });
    const imageSource = src;

    return (
      <div className={loadImage}>
        <ImageSpinner size={50} />
        <img
          draggable='false'
          onLoad={::this.loadedImage}
          src={imageSource}
          alt={alt ? alt : 'Picture'}
          ref='image'/>
      </div>
    );
  }
}
