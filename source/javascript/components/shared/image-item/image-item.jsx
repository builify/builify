import React from 'react';
import classNames from '../../../common/classnames';
import ProgressBar from '../progress-bar';

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
    const { isImageFileLoaded } = this.state;
    const loadImage = classNames('loadimage', {
      'loaded': isImageFileLoaded
    });
    const imageSource = src;

    return (
      <div className={loadImage}>
        { !isImageFileLoaded && <ProgressBar className={classNames('loadimage__spinner')} type='circular' mode='indeterminate' multicolor /> }
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
