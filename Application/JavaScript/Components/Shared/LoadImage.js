import React, { Component } from 'react';
import classNames from 'classnames';

class LoadImage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isImageFileLoaded: false
    };
  }

  imageOnLoad (e) {
    if (this.isMounted()) {
      this.setState({
        isImageFileLoaded: true
      });
    }
  }

  componentDidMount () {
    let imageTag = this.refs.image;
    let imageSource = imageTag.getAttribute('src');
    let image = new Image();

    image.onload = this.imageOnLoad;
    image.src = imageSource;
  }

  render () {
    let imageClassName = classNames('image', this.state.isImageFileLoaded ? 'loaded' : '');

    return (
      <img
        {...props}
        className={imageClassName}
        ref='image' />
    )
  }
}

export default LoadImage;