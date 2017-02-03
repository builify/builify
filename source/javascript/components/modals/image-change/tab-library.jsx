import React from 'react';
import classNames from '../../../common/classnames';
import Random from '../../../common/random';
import Scrollbar from '../../shared/scrollbar';
import Image from '../../shared/image';
import {
  map as _map,
  sortBy as _sortBy,
  has as _has
} from 'lodash';

export default class ImageEditContentImages extends React.Component {
  static propTypes = {
    builderConfiguration: React.PropTypes.object.isRequired,
    onSelectImage: React.PropTypes.func.isRequired
  };

  state = {
    activeCategory: 0
  };

  defaultImages = [];

  componentWillMount () {
    const { builderConfiguration } = this.props;
    const { imageLibraryCategories } = builderConfiguration;

    this.defaultImages = _sortBy(imageLibraryCategories, 'category');
  }

  renderCategories () {
    const { activeCategory } = this.state;
    let className = null;

    return _map(this.defaultImages, (item, idx) => {
      const { category } = item;

      className = classNames('modal__tabitem', {
        'active': !!(idx === activeCategory)
      });

      return (
        <div
          key={Random.randomKey('tabitem')}
          className={className}
          onClick={() => {
            this.setState({
              activeCategory: idx
            });
          }}>
          <span>{category}</span>
        </div>
      );
    });
  }

  renderImages () {
    const { activeCategory } = this.state;
    const { onSelectImage } = this.props;
    let className = null;

    return (
      <div className={classNames('modal__tabimages')}>
        { _map(this.defaultImages, (item, catIdx) => {
          if (catIdx !== activeCategory || !_has(item, 'images')) {
            return null;
          }

          return _map(item.images, (imageInfo) => {
            const { source: imageSource, thumbnail: imageThumbnail } = imageInfo;
            className = classNames('modal__tabimage');

            return (
              <Image
                className={className}
                backgroundImage
                src={imageThumbnail}
                onClick={() => {
                  return onSelectImage({
                    src: imageSource
                  });
                }} />
            );
          });
        }) }
      </div>
    );
  }

  render () {
    const spanStyle = {
      display: 'block',
      top: '30px',
      position: 'relative',
      fontSize: '12px'
    };

    return (
      <div className={classNames('modal__tab')}>
        <aside className={classNames('modal__tabside')}>
          <h2>Categories</h2>
          <nav className={classNames('modal__tabmenu')}>
            { this.renderCategories() }
          </nav>
          <div style={spanStyle}>Images by <a href="https://unsplash.com/" target="_blank">Unsplash</a></div>
        </aside>
        <main className={classNames('modal__tabcontent')}>
          <Scrollbar height={380}>
            { this.renderImages() }
          </Scrollbar>
        </main>
      </div>
    );
  }
}
