import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../../common/classnames';
import ProgressBar from '../progress-bar';

export default class ImageItem extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    loaded: PropTypes.bool
  };

  static defaultProps = {
    alt: '',
    loaded: false
  };

  state = {
    isImageFileLoaded: this.props.loaded
  };

  constructor (props) {
    super(props);

    this.loadedImage = this.loadedImage.bind(this);
  }

  imageDrag (e) {
    e.preventDefault();
    return this;
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
      loaded: isImageFileLoaded
    });

    return (
      <div className={loadImage}>
        { !isImageFileLoaded && <ProgressBar className={classNames('loadimage__spinner')} type="circular" mode="indeterminate" multicolor /> }
        <img
          draggable="false"
          onLoad={this.loadedImage}
          src={src}
          alt={alt || 'Picture'} />
      </div>
    );
  }
}
