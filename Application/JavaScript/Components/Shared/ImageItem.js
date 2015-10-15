import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadedAsset } from '../../Actions/ActionCreators';
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

  loadedImage (e) {
    const { src } = this.props;

    this.setState({
      isImageFileLoaded: true
    });
  }

  render () {
    const { isImageFileLoaded } = this.state;
    const { src, alt } = this.props;
    const loadImage = classNames('ab-loadimage', this.state.isImageFileLoaded ? 'loaded' : '');
    const imageSource = src;

    return (
      <div
        className={loadImage}
        ref='imageWrapper'>
        <ImageSpinner size={70} />
        <img
          onLoad={::this.loadedImage}
          src={imageSource}
          alt={alt ? alt : 'Picture'} 
          ref='image'/>
      </div>
    )
  }
}

export default ImageItem;