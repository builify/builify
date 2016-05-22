import React from 'react';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortby';
import _has from 'lodash/has';
import classNames from '../../../common/classnames';
import Random from '../../../common/random';
import Scrollbar from '../../shared/scrollbar';
import Image from '../../shared/image';

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
          if (catIdx !== activeCategory) {
            return null;
          }

          if (_has(item, 'images')) {
            return _map(item.images, url => {
              className = classNames('modal__tabimage');

              return (
                <Image
                  className={className}
                  backgroundImage
                  src={url}
                  onClick={() => {
                    return onSelectImage({
                      src: url
                    });
                  }} />
              );
            });
          }

          return null;
        }) }
      </div>
    );
  }

  render () {
    return (
      <div className={classNames('modal__tab')}>
        <aside className={classNames('modal__tabside')}>
          <h2>Categories</h2>
          <nav className={classNames('modal__tabmenu')}>
            { this.renderCategories() }
          </nav>
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
