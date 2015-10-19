import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadedAsset } from '../../Actions/ActionCreators';
import classNames from 'classnames';
import ImageSpinner from './ImageSpinner.jsx';

class ImageItem extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    loaded: PropTypes.bool
  }

  static defaultProps = {
    src: '',
    loaded: false
  }

  constructor (props) {
    super(props);

    this.state = {
      isImageFileLoaded: props.loaded ? true : false
    };
  }

  imageDrag (e) {
    e.preventDefault();
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
