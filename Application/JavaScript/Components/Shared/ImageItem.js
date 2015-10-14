import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ImageSpinner from './ImageSpinner';

class ImageItem extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      isImageFileLoaded: false
    };
  }

  componentDidMount () {
    const { src } = this.props;
    let image = new Image();

    image.onload = (e) => {
      this.setState({
        isImageFileLoaded: true
      });
    };
    
    image.src = src;
  }

  render () {
    const { isImageFileLoaded } = this.state;
    const { src, alt } = this.props;
    const loadImage = classNames('ab-loadimage', this.state.isImageFileLoaded ? 'loaded' : '');
    const imageSource =  isImageFileLoaded ? src : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    
    return (
      <div
        className={loadImage}
        ref='imageWrapper'>
        <ImageSpinner size={70} />
        <img
          src={imageSource}
          alt={alt ? alt : 'Picture'} 
          ref='image'/>
      </div>
    )
  }
}

export default ImageItem;