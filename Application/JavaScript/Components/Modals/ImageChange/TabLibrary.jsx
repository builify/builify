import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Random from '../../../Common/Random';
import Scrollbar from '../../Shared/Scrollbar';
import Image from '../../Shared/Image';

export default class ImageEditContentImages extends React.Component {
  static defaultProps = {
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

    this.defaultImages = _.sortBy(imageLibraryCategories, 'category');
  }

  renderCategories () {
    const { activeCategory } = this.state;
    let className = null;
    let key = null;

    return _.map(this.defaultImages, (item, idx) => {
      const { category } = item;

      className = classNames('ab-modal__tabitem', {
        'active': !!(idx === activeCategory)
      });
      key = Random.randomKey('tabitem');

      return (
        <div
          key={key}
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
      <div className='ab-modal__tabimages'>
        { _.map(this.defaultImages, (item, catIdx) => {
          if (catIdx !== activeCategory) {
            return null;
          }

          if (_.has(item, 'images')) {
            return _.map(item.images, url => {
              className = classNames('ab-modal__tabimage');

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
      <div className='ab-modal__tab'>
        <aside className='ab-modal__tabside'>
          <h2>Categories</h2>
          <nav className='ab-modal__tabmenu'>
            { this.renderCategories() }
          </nav>
        </aside>
        <main className='ab-modal__tabcontent'>
          <Scrollbar height={380}>
            { this.renderImages() }
          </Scrollbar>
        </main>
      </div>
    );
  }
}
